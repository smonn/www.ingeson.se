const { createReadStream, createWriteStream } = require("fs");

const copy = (source, target) =>
  new Promise((resolve, reject) => {
    const read = createReadStream(source);
    read.on("error", reject);
    const write = createWriteStream(target);
    write.on("error", reject);
    write.on("close", resolve);
    read.pipe(write);
  });

module.exports = copy;
