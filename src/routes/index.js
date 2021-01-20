const { response } = require('express');
const express = require('express');
const router = express.Router();
const app = express();
const fetch = require('node-fetch');


router.get('/',async (req,res)=>{
    res.render('index.hbs');
});
router.post('/',async (req,res)=>{
    var string;
    const {palabra} = req.body;
    const newPalabra = {
        palabra
    };
    var url_object;
    const api_url =  `https://dictionaryapi.com/api/v3/references/spanish/json/${newPalabra.palabra}?key=8f3704d3-34fc-4f8e-8735-245b9272e811`;
    if (newPalabra != "") {
            await fetch(api_url)
                .then(res => res.json())
                .then(data => url_object = data)
                .then(() => console.log(url_object[0]))
       }else{
             console.log("no hay palabra");
    }
string = JSON.stringify(url_object[0].shortdef[0]);
res.render('index.hbs', {string});
});


module.exports = router;

