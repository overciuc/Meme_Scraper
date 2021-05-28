const axios = require('axios');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const fs = require('fs');

// fetch the html from url
const site = 'https://memegen-link-examples-upleveled.netlify.app/';

fs.mkdirSync('./Memes', { recursive: true });
console.log('Creating your new Memes folder...');

axios.get(site).then((response) => {
  const html = response.data;
  const dom = cheerio.load(html);

  // store the image data into an array
  const imageArray = [];
  dom('img').each((i, img) => {
    // loop through the first 10 images and store them into the array
    if (i <= 9) {
      imageArray.push(img.attribs.src);
    }
  });
  // loop through the images in the array and store them into Memes folder with .jpg extension
  for (let i = 0; i < imageArray.length; i++) {
    async function downloadImages() {
      const getImageResponse = await fetch(imageArray[i]);
      const myBlob = await getImageResponse.buffer();
      fs.writeFile(`./Memes/${i}.jpg`, myBlob, () =>
        // display a progress message in the console
        console.log(`Image ${i} download and saving complete`),
      );
    }
    downloadImages();
  }
});
