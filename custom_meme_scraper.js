const fetch = require('node-fetch');
const axios = require('axios');
const fs = require('fs');
const cheerio = require('cheerio');
const readline = require('readline');

let userInput1 = process.argv[2];
let userInput2 = process.argv[3];
let userInput3 = process.argv[4];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const benderSite = `https://api.memegen.link/images/${userInput3}/${userInput1}/${userInput2}.png?height=350&width=600`;

async function downloadImage() {
    const getImageResponse = await fetch(benderSite);
    const myBlob = await getImageResponse.buffer();
    fs.writeFile('./Memes/custom.png', myBlob, () => {
        // display a progress message in the console
        console.log(`Image download and saving complete`);
        process.exit(0);
    });
}
downloadImage();