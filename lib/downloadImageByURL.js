const request = require("request");
const fs = require("fs");


function downloadImageByURL(url, path) {
  //Check to see if the the 'avatars' folder exists
  //If it does not, create it, then run program
  try {
    fs.accessSync("./avatars");
    request(url).pipe(fs.createWriteStream(`./avatars/${path}.png`))
  }
  catch (error) {
    fs.mkdirSync("./avatars");
    request(url).pipe(fs.createWriteStream(`./avatars/${path}.png`))
  }
}

module.exports = downloadImageByURL;
