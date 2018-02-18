import * as MsTranslator from 'mstranslator';

export class ImageService {
    client = new MsTranslator({
        api_key: "ff8a23977cc846d8bfcca73c6b5f06c0"
    }, true);

    getES(wordsArr){
        let words =  wordsArr.join(" ");
        let params = {
            text: '"' + words + '"'
            , from: 'en'
            , to: 'es'
        }
        let result = "hello wah"
        this.client.translate(params, function(err, data) {
            result = data;
        });
        return result
    }

    getBase64Image(img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }


    makeBlob(dataURL) {
        let BASE64_MARKER = ';base64,';
        if (dataURL.indexOf(BASE64_MARKER) == -1) {
            let parts = dataURL.split(',');
            let contentType = parts[0].split(':')[1];
            let raw = decodeURIComponent(parts[1]);
            return new Blob([raw], { type: contentType });
        }
        let parts = dataURL.split(BASE64_MARKER);
        let contentType = parts[0].split(':')[1];
        let raw = window.atob(parts[1]);
        let rawLength = raw.length;

        let uInt8Array = new Uint8Array(rawLength);

        for (var i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }

        return new Blob([uInt8Array], { type: contentType });
    }

}
