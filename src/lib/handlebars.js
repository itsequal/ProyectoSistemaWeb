const exphbs = require ('express-handlebars');
const fetch = require("node-fetch");

const helpers = {};

helpers.fetch_api = (word) =>{
     var url_object;
     var word;
     var palabra=word;
     const api_url =  `https://dictionaryapi.com/api/v3/references/spanish/json/${palabra}?key=8f3704d3-34fc-4f8e-8735-245b9272e811`;
     if (palabra = word) {
             fetch(api_url)
                 .then(res => res.json())
                 .then(data => url_object = data)
                 .then(() => console.log(url_object))
        }else{
              console.log("no hay palabra");
     }
}


module.exports = helpers;