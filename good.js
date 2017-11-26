let axios = require('axios');
let parser = require('xml2json');

axios({
  url: 'https://www.goodreads.com/search.xml?key=4kxKjdaFlijmQIix5XlElA&q=Ender%27s+Game',
  params: {
    key: '4kxKjdaFlijmQIix5XlElA',
    q: 'Ender\'s Game',
    page: 2
  },
  responseType: 'text'
})
  .then((response) => {
    console.log(response.data);
    var json = parser.toJson(response.data);
    console.log("to json -> %s", json);
  });