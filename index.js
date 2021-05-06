const axios = require('axios');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const fs = require('fs');

const site = 'https://memegen-link-examples-upleveled.netlify.app/';

axios.get(site).then((response) => {
    const html = response.data;
    const dom = cheerio.load(html);
    const imageArray = [];
    dom('img').each((i, img) => {
        if (i <= 9) {
            imageArray.push(img.attribs.src);
        }
    });

    for (let i = 0; i < imageArray.length; i++) {
        async function downloadImages() {
            const getImageResponse = await fetch(imageArray[i]);
            const myBlob = await getImageResponse.buffer();
            fs.writeFile(`./Memes/${i}.jpg`, myBlob, () =>
                console.log(`Image ${i} download and saving complete`),
            );
        }
        downloadImages();
    }
    //console.log(imageArray);
});