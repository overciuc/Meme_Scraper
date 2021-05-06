const axios = require('axios');
const cheerio = require('cheerio');
//const fetch = require('node-fetch');

const site = 'https://memegen-link-examples-upleveled.netlify.app/';

axios(site)
    .then((response) => {
        const html = response.data;
        const dom = cheerio.load(html);
        const images = dom('img');
        const imageArray = [];
        for (let i = 0; i < 10; i++) {
            imageArray.push(images[i]);
            console.log(imageArray);
        }
    })
    .catch(console.error);