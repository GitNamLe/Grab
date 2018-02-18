import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-ocr-render',
  templateUrl: 'ocr-render.html',
})
export class OcrRenderPage {
  data: any;
  img: any;
  respond: string;
  toggleImg: boolean = true;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,) {
  }

  ngOnInit() {
    /* this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index'); */
    this.data = this.navParams.get('data');
    this.img = this.navParams.get('img');

  }

  notify(){
    console.log("toggled: " + this.toggleImg)
  }
  
}
