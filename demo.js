var Tesseract = require('tesseract.js');
var cv = require('opencv4nodejs');


var myImage = "./abc.png";


var img = cv.imread(myImage)
// gray scaling
img = img.bgrToGray();

var kernel = new cv.Mat(1, 1, 1, 1);
img = img.dilate(kernel)
img = img.erode(kernel)
cv.imwrite(__dirname + "/image_after_filter_noise.png", img)

img = img.adaptiveThreshold(255, cv.ADAPTIVE_THRESH_MEAN_C, cv.THRESH_BINARY, 11, 3);


cv.imwrite(__dirname + "/image_final.png", img)

Tesseract.recognize("./image_final.png", {
    lang: 'vie'
})
    .progress(function (p) {
        console.log('progress', p)
    }).catch(err => console.log(err))
    .then(function (result) {
        console.error('\n\nresult: ', result.text)
        console.error('confidence: ', result.confidence + "%")
        // console.error(result)
    })


//result: tesseraét.proce55(_dirhame i- '7image.jbg',function(err, text)