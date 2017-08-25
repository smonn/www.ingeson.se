const { writeFile, mkdir } = require("fs");
const { dirname } = require("path");

const write = (path, content) =>
  new Promise((resolve, reject) => {
    const dir = dirname(path);
    mkdir(dir, err => {
      if (err && err.code !== "EEXIST") return reject(err);
      writeFile(path, content, err => {
        if (err) return reject(err);
        resolve();
      });
    });
  });

module.exports = write;
