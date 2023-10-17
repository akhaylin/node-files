"use strict";
const fsP = require("fs/promises");

/**
 * Takes a pathway to a text file
 * reads the file and prints the contents to console
 */
async function cat(path) {
  try {
    let contents = await fsP.readFile(path, "utf8");
    console.log(contents);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
const argv = process.argv;
cat(argv[2]);