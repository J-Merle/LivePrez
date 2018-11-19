'use strict';
var express = require("express");
var router = express.Router();
module.exports = router;

// TODO : Routing using

router.route("/loadPres").get(function(request, response){
    response.end("AHAH JAI LOAD MA PRES PTDR");
});

router.route("/savePres").post(function(request, response){
    let presentation = request.body;

    // A presentation without id can not be saved
    if(!pres.id) {
        response.writeHead(422);
        response.end("Unprocessable entity");
        return -1;
    }

    fs.writeFile(path.join(CONFIG.presentationDirectory))

    
});
