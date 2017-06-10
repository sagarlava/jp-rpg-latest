import {Component, ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { PlacesearchPage } from '../placesearch/placesearch';
import { RoutesPage } from '../routes/routes';
import { EtaresultPage } from '../etaresult/etaresult';
import { StopsnearmePage } from '../stopsnearme/stopsnearme';
import { GeneralinfoPage } from '../generalinfo/generalinfo';
import { PreferencemodalPage } from '../preferencemodal/preferencemodal';
import { DatepickerPage } from '../datepicker/datepicker';
import { Geolocation } from '@ionic-native/geolocation';
import { Constants } from '../../services/constants';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  registered: boolean;
  name: string;
  startAddress: any;
  startLocation:any;
  endAddress: any;
  endLocation:any;
  whatTime:any;

  private selected: boolean = false;
  selectedDate: any;

  private watch:any;

  @ViewChild('datePicker') datePicker; //inject element


  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private geolocation: Geolocation, private http:Http, private constants:Constants) {
    this.whatTime = Observable.interval(1000).map(x => new Date()).share();
    console.log(constants);
  }

  sayMyName() {
    console.log('My name is sagar')
    this.registered=!this.registered;
    this.name="sagar";
  }

  setStartLocation(){
    let modal = this.modalCtrl.create(PlacesearchPage,{name:this.name});

    modal.onDidDismiss(data => {
     console.log(data);
     if(data!=undefined){
       this.startAddress=data.place.formatted_address;
       this.startLocation={lat:data.place.geometry.location.lat(),lng:data.place.geometry.location.lng()};

       //console.log(this.startLocation);
      }
    });

    modal.present();
  }


  setEndLocation(){
    let modal = this.modalCtrl.create(PlacesearchPage,{name:this.name});

    modal.onDidDismiss(data => {
     console.log(data);
     if(data!=undefined){
       this.endAddress=data.place.formatted_address;
       this.endLocation={lat:data.place.geometry.location.lat(),lng:data.place.geometry.location.lng()}

       console.log(this.startLocation);
      }
    });

    modal.present();
  }


  planJourneyClicked(){

    this.http.get(this.constants.BASE_URL_ROUTE_SEARCH).subscribe(data => {
        let body = data.json();
        //console.log(body);
        this.navCtrl.push(RoutesPage,{data:body,startAddress:this.startAddress,endAddress:this.endAddress, startLocation:this.startLocation, endLocation:this.endLocation});

    });
  }

  changeTime(){
    alert(this.name);
  }

  viewETAClicked(){
    this.navCtrl.push(EtaresultPage,{data:"sagar"})
  }

  viewStopsNearMeClicked(){
    this.navCtrl.push(StopsnearmePage,{data:"sagar"})
  }

  onGeneralInfoClicked(){
    this.navCtrl.push(GeneralinfoPage,{data:"sagar"})
  }




	dateChanged(date) {
    console.log(date);
		this.selected=true;
    //this.selectedDate=datePipe.transform(date, 'dd/MM/yyyy');
	};



  ionViewDidLoad() {
    this.geolocation.getCurrentPosition().then((resp) => {
     // resp.coords.latitude
     // resp.coords.longitude
     this.startLocation={lat:resp.coords.latitude,lng:resp.coords.longitude};
     this.getGeoCodeReverse(resp.coords.latitude,resp.coords.longitude);
     //console.log(resp);
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    this.watch = this.geolocation.watchPosition();
    this.watch.subscribe((data) => {
     // data can be a set of coordinates, or an error (if an error occurred).
     // data.coords.latitude
     // data.coords.longitude

     console.log(data);
     this.getGeoCodeReverse(data.coords.latitude,data.coords.longitude);
    });
  }

  ionViewWillUnload() {
    this.watch.unsubscribe();
  }

  getGeoCodeReverse(lat:any, lng: any){
    this.http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&sensor=true').subscribe(data => {
        let body = data.json();
        if(body.results[0])
          this.startAddress = body.results[0].formatted_address;

    });
  }


  showPreference(){
    let modal = this.modalCtrl.create(PreferencemodalPage,{name:this.name});

    modal.onDidDismiss(data => {
     console.log(data);
     if(data!=undefined){

      }
    });

    modal.present();
  }

  showDatePicker(){
    let modal = this.modalCtrl.create(DatepickerPage,{name:this.name});

    modal.onDidDismiss(data => {
     console.log(data);
     this.selected=false;
     if(data!=undefined){
        this.selected=true;
        this.selectedDate=data;
     }
    });

    modal.present();
  }

}
