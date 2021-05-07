/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unicorn/prefer-node-protocol */
const fetch = require('node-fetch');
const fs = require('fs');
const readline = require('readline');

const userInput1 = process.argv[2];
const userInput2 = process.argv[3];
const userInput3 = process.argv[4];

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