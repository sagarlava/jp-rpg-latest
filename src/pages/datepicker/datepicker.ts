import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { DatePipe } from '@angular/common';

/**
 * Generated class for the DatepickerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-datepicker',
  templateUrl: 'datepicker.html',
})
export class DatepickerPage {
  public dateOptions:Array<Object>=[];
  public selectedDate:any;
  public hours:Array<string>=[];
  public selectedHour:any;
  public mins:Array<string>=[];
  public selectedMinute:any;


  constructor(public viewCtrl: ViewController, public navParams: NavParams, public datePipe:DatePipe) {
    for(var i=1; i<=24; i++){
      var hr;
      var d=new Date();
      if(i<=9)
        hr="0"+i;
      else
        hr=i.toString();

      this.hours.push(hr);

      if(d.getHours()==i){
        this.selectedHour=hr;
      }



    }

    for(i=0; i<=60; i+=15){
      var mn;
      var d=new Date();
      if(i<=9)
        mn="0"+i;
      else
        mn=i.toString();

      this.mins.push(mn);
      this.selectedMinute="00";

    }




  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatepickerPage');
    console.log(this.dateOptions);
    this.selectedDate=new Date();
    var dateLabel="Today";
    for(var i=0; i<7; i++){
      var date=this.addDays(new Date(),i);

      if(i==1){
        dateLabel="Tomorrow";
      }
      else if(i>1){
        dateLabel= this.datePipe.transform(date,'dd MMM yyyy');
      }

      this.dateOptions.push(
        {
          label:dateLabel,
          value:date
        }
      )
    }
  }

  addDays(date: Date, days: number): Date {
        date.setDate(date.getDate() + days);
        return date;
  }


  onDateSet(){
      //console.log(this.selectedDate);
      this.viewCtrl.dismiss({date:this.selectedDate,hour:this.selectedHour,min:this.selectedMinute,sec:0});
  }

  onDateCancelled(){
    this.viewCtrl.dismiss();
  }

}