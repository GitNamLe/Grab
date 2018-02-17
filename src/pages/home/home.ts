import { Component } from '@angular/core';
import { Camera } from '@ionic-native/camera';

import * as $ from 'jquery'
import * as jQuery from 'jquery';
import { ImageService } from '../../services/ocr.service';
import { LoadingController, AlertController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { OcrRenderPage } from '../ocr-render/ocr-render';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public base64Image: string;
  blob: any;
  constructor(private camera: Camera,
              private imageService: ImageService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              public nav: NavController) {
  }

  //not yet until we have url => base64 => blob and then we can test for cordova on ionic view
  takePicture(){
    const loading = this.loadingCtrl.create({
      content: 'Signing you in...'
    });
    loading.present();
    this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 200,
        targetHeight: 200
        }).then((imageData) => {
          loading.dismiss();
          // imageData is a base64 encoded string
          this.base64Image = "data:image/jpeg;base64," + imageData;
        }, (err) => {
          loading.dismiss();
          const alert = this.alertCtrl.create({
            title: 'Signin Failed',
            message: err,
            buttons: ['ok']
          });
          alert.present();
        });

/*      let blob = this.imageService.makeblob(this.base64Image); 
        this.processImage(blob) */
        this.blob = this.imageService.makeBlob(this.base64Image);
  };

  processImage() {
    const loading = this.loadingCtrl.create({
      content: 'sending request'
    });
    loading.present();

    var subscriptionKey = "6e1e785baae34fd3a857005712ab7810";
    var uriBase = "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/ocr";

    // Request parameters.
    var params = {
        "language": "unk",
        "detectOrientation ": "true",
    };

    // Perform the REST API call.
    $.ajax({
        url: uriBase + "?" + $.param(params),

        // Request headers.
        beforeSend: function(jqXHR){
            jqXHR.setRequestHeader("Content-Type","application/octet-stream");
            jqXHR.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },

        type: "POST",

        // Request body.
        data: this.blob,
        processData: false
    })

    .done((data) => {
      this.nav.push(OcrRenderPage, {data: data.regions[0]});
    })

    .fail(function(jqXHR, textStatus, errorThrown) {
        loading.dismiss();
        // Display error message.
        var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
        errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ? 
            jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;

        const alert = this.alertCtrl.create({
          title: 'Request Failed',
          message: errorString,
          buttons: ['ok']
        });
        alert.present();

    });
};

}
