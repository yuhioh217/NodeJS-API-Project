"use strict";
import fs from "fs";

const copy = (src, dst) => {
  try {
    fs.createReadStream(src).pipe(fs.createWriteStream(dst));
  } catch (e) {
    console.log(e);
  }
};

const main = argv => {
  copy(argv[0], argv[1]);
};

main(["./app.js", "./test/app.js"]);
