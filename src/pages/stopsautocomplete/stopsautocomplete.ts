import { StopsautocompletePageModule } from './stopsautocomplete.module';
import { StopsnearmePage } from './../stopsnearme/stopsnearme';
import { Http } from '@angular/http';
import { Constants } from './../../services/constants';
import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the StopsautocompletePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stopsautocomplete',
  templateUrl: 'stopsautocomplete.html',
})
export class StopsautocompletePage {
  search: string;
  name:string;
  items: any;
  constructor(public viewCtrl: ViewController,public navParams: NavParams,public constants:Constants, private http:Http ) {
    //alert(this.navParams.data.name);
    // if(this.navParams.data.name=="start"){
    //   this.search="Bus Terminal Komtar";
    // }
    
    // if(this.navParams.data.name=="end"){
    //   this.search="Masjid Jamek Al-munauwar";
    // }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Routes Autocomplete');
  }


  onCloseClicked(){
      //alert("hello");
      this.viewCtrl.dismiss();
  }

  getAddressOnChange(place){
    //console.log(place);
    this.viewCtrl.dismiss({place:place});
  }

  goBackClicked(){
    this.viewCtrl.dismiss();
  }

  onSearchKeyPress(){
    this.http.get(this.constants.BASE_URL_STOPS_AUTOCOMPLETE+"?query="+this.search).subscribe(data => {
        this.items = data.json();
        //console.log(body);
    });
  }

  onItemClick(item){
    this.viewCtrl.dismiss({item});
  }

}
