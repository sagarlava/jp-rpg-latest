import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { Constants } from '../../services/constants';
declare var google:any;
/**
 * Generated class for the PlacesearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-placesearch',
  templateUrl: 'placesearch.html',
})
export class PlacesearchPage {
  search: string;
  name:string;
  geocoder:any;
  items: any;
  constructor(public viewCtrl: ViewController,public navParams: NavParams, private http:Http, public constants:Constants) {
    //alert(this.navParams.data.name);
    // if(this.navParams.data.name=="start"){
    //   this.search="Jetty, Pengalan Weld Georgetown George Town Penang Malaysia";
    // }
    
    // if(this.navParams.data.name=="end"){
    //   this.search="Komtar George Town Penang Malaysia";
    // }

    // this.geocoder = new google.maps.Geocoder();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlacesearchPage');
  }


  onCloseClicked(){
      alert("hello");
      this.viewCtrl.dismiss();
  }

  // getAddressOnChange(place){
  //   console.log(place.geometry);
  //   var obj=this;
  //   if(place.geometry===undefined){
  //     this.geocoder.geocode( { 'address': this.search}, function(results, status) {
  //       if (status == 'OK') {
  //         results[0]['name']=obj.search;
  //         obj.viewCtrl.dismiss({place:results[0]});
  //       } else {
  //         console.log('Geocode was not successful for the following reason: ' + status);
  //         obj.viewCtrl.dismiss({place:place});
  //       }
  //     });
  //   }
  //   else
  //   {
  //     this.viewCtrl.dismiss({place:place});
  //   }
  // }

  onSearchKeyPress(){
    this.http.get(this.constants.BASE_URL_STOPS_AUTOCOMPLETE+"?query="+this.search).subscribe(data => {
        this.items = data.json();
        //console.log(body);
    });
  }

  goBackClicked(){
    this.viewCtrl.dismiss();
  }



}
