import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GeneralinfoPage } from './generalinfo';

@NgModule({
  declarations: [
    GeneralinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(GeneralinfoPage),
  ],
  exports: [
    GeneralinfoPage
  ]
})
export class GeneralinfoPageModule {}
