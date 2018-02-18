import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ImageService } from '../../services/ocr.service';

import * as MsTranslator from 'mstranslator';

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
  // translator api
  result = "hello wah";
  client = new MsTranslator({
      api_key: "ff8a23977cc846d8bfcca73c6b5f06c0"
  }, true);


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private imageService: ImageService) {
  }

  ngOnInit() {
    /* this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index'); */
    this.data = this.navParams.get('data');
    this.img = this.navParams.get('img');

    this.data.map((row) => {
      row.words.map((word) => { this.wordsArr.push(word.text) })
    })

    if(this.wordsArr[0] === "You,"){
      this.viewEx1 = true;
    }
    if(this.wordsArr[0] === "Please"){
      this.viewEx2 = true;
    }
    if(this.wordsArr[0] === "A"){
      this.viewEx3 = true;
    }
  }

  getES(){
    let words =  this.wordsArr.join(" ");
    let params = {
        text: '"' + words + '"'
        , from: 'en'
        , to: 'es'
    };
    this.client.translate(params, (err, data) => {
        this.result = data;
    });
  this.wordsArr = this.result.split(" ");
}

  notify(){
    console.log("toggled: " + this.toggleImg)
  }

}
