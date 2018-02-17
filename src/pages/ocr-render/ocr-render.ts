import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-ocr-render',
  templateUrl: 'ocr-render.html',
})
export class OcrRenderPage {
  data: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,) {
  }

  ngOnInit() {
    /* this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index'); */
    this.data = this.navParams.get('data');
  }

}
