"use strict";

const fsP = require("fs/promises");

/**
 * Takes a pathway to a text file
 * reads the file and prints the contents to console
 */
async function cat(path) {
  let contents;
  try {
    contents = await fsP.readFile(path, "utf8");

  } catch (err) {
    console.log(err.code);
    process.exit(1);
  }
  console.log(contents);
}

/**
 * Takes a url, performs a get to that url
 * prints html to console
 */
async function webCat(url) {
  let html;
  try {
    const response = await fetch(url);
    html = await response.text();
  }
  catch (err) {
    console.log(`error fetching ${url}`, err);
    process.exit(1);
  }
  console.log(html);
}

/** checks if args passed in command line is a url or path, runs the corresponding
* function
*/
const argv = process.argv;
try {
  const url = new URL(argv[2]);
  webCat(url);
}
catch (err) {
  cat(argv[2]);
}



