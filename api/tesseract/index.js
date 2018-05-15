'use strict';

var express = require('express');
var controller = require('./controller');
var router = express.Router();
/**
 * @swagger
 * /api/tesseract/textDetection:
 *   post:
 *     tags:
 *       - Text Recorgnize
 *     description: Text Recorgnize api
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: base64 image
 *         description: base64 image
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           example: {"image_base64":"hello","language":"vie"}
 *     responses:
 *       200:
 *         description: thành công.
 *       400:
 *         description: Bad request.
 *       403:
 *         description: Schedule is existed.
 *       500:
 *         description: Lỗi chưa được xác định
 */
router.post("/textDetection", controller.textDetection);


module.exports = router;