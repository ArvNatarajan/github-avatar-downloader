const getRepoContributors = require("./lib/getRepoContributors");
const downloadImageByURL = require("./lib/downloadImageByURL");



function checkCommandLineArgumentsThenRun() {
  //Error to check if the right number of arguments have been input to CLI
  if (process.argv.length !== 4) {
    console.log("Incorrect number of arguments! Please ensure you have entered in Owner and Repo name");
  } else {
    getRepoContributors(process.argv[2], process.argv[3], downloadImageByURL);
  }
}

checkCommandLineArgumentsThenRun();
