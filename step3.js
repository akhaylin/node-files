"use strict";

const fsP = require("fs/promises");

/**
 * Takes a pathway to a text file
 * reads the file and returns its contents.
 */
async function cat(path) {
  let contents;
  try {
    contents = await fsP.readFile(path, "utf8");

  } catch (err) {
    console.log(err.code);
    process.exit(1);
  }
  return contents;
}

/**
 * Takes a url, performs a get to that url
 * and returns the html.
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
  return html;
}

/**
 * Takes file path and content to write.
 * Writes a file to the path with the content.
 */
async function writeOutput(path, content) {
  try {
    await fsP.writeFile(path, content, "utf8");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  console.log("Successfully wrote to file!");
}

/**
* checks args passed in command line, runs the corresponding
* function to write or log contents to the console.
*/
async function main() {

  const argv = process.argv;
  let content;
  let outputFile;
  let fileOrUrl;

  if (argv[2] === "--out") {
    outputFile = argv[3];
    fileOrUrl = argv[4];
  } else {
    fileOrUrl = argv[2];
  }

  // Could refactor this into its own function
  try {
    const url = new URL(fileOrUrl);
    content = await webCat(url);
  }
  catch (err) {
    content = await cat(fileOrUrl);
  }

  if (outputFile) {
    try {
      writeOutput(outputFile, content);
    }
    catch (err) {
      console.error(err);
      process.exit(1);
    }
  } else {
    console.log(content);
  }
}

main();


