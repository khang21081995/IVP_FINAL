// const logger = require('../../utils/logger');
// const rootUrl = require('../../views/config').getUrl();
var Tesseract = require('tesseract.js');
var cv = require('opencv4nodejs');
var fs = require('fs');

var removeFile = function (filePath) {
    console.log("remove: " + filePath);
    fs.unlink(filePath, function (err) {

        if (err && err.code == 'ENOENT') {
            // file doens't exist
            console.info("File doesn't exist, won't remove it.");
        } else if (err) {
            // other errors, e.g. maybe we don't have enough permission
            console.error("Error occurred while trying to remove file");
        } else {
            console.info(`removed`);
        }
    });
}


module.exports = {
    textDetection: function (req, res) {
        var dateNow = Date.now();
        var imageName = req.sessionID + dateNow;
        var imageBase64 = req.body.image_base64;
        var language = req.body.language || 'vie';
        var tmpDir = __dirname + "/tmp";
        if (imageBase64 && imageBase64.includes('data:image')) {
            var base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
            fs.writeFile(tmpDir + "/" + imageName + ".png", base64Data, 'base64', function (err) {
                if (err) {
                    res.status(404).json({message: "Fail to create new image!"});
                } else {
                    var img = cv.imread(tmpDir + "/" + imageName + ".png");
                    img = img.bgrToGray();
                    var kernel = new cv.Mat(2, 2, 1, 1);
                    img = img.erode(kernel)
                    img = img.dilate(kernel)
                    cv.imwrite(tmpDir + "/" + imageName + "_after_filter_noise.png", img);
                    removeFile(tmpDir + "/" + imageName + ".png");
                    Tesseract.recognize(tmpDir + "/" + imageName + "_after_filter_noise.png", {
                        lang: language
                    })
                        .progress(function (p) {
                                console.log('progress', p)
                            }
                        ).catch(function (err) {
                            removeFile(tmpDir + "/" + imageName + "_after_filter_noise.png");
                            res.status(502).json({message: "Recognize Fail", err: err});
                        }
                    )
                        .then(function (result) {
                                console.error('\n\nresult: ', result.text)
                                console.error('confidence: ', result.confidence + "%")
                                removeFile(tmpDir + "/" + imageName + "_after_filter_noise.png");
                                res.status(200).json({result: result.text, confidence: result.confidence});
                                // console.error(result)
                            }
                        )
                }
            });

        } else {
            res.status(400).json({message: "Bad Request"});
        }

    }


}
