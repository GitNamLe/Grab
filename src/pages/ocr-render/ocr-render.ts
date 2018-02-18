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
  wordsArr = [];
  toggleImg: boolean = true;
  viewEx1 = false;
  viewEx2 = false;
  viewEx3 = false;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,) {
  }

  ngOnInit() {
    /* this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index'); */
    this.data = this.navParams.get('data');
    this.img = this.navParams.get('img');

    this.data.map((row) => {
      row.words.map((word) => { this.wordsArr.push(word.text) })
    })

    if(this.wordsArr[0] === "You"){
      this.viewEx1 = true;
    }
    if(this.wordsArr[0] === "Please"){
      this.viewEx2 = true;
    }
    if(this.wordsArr[0] === "A"){
      this.viewEx3 = true;
    }


  }

  notify(){
    console.log("toggled: " + this.toggleImg)
  }

}
