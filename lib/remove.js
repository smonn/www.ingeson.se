const { access, lstat, readdir, rmdir, unlink } = require("fs");
const { join } = require("path");

const removeFile = path =>
  new Promise((resolve, reject) => {
    lstat(path, (err, stats) => {
      if (err && err.code === 'ENOENT') return resolve();
      if (err) return reject(err);
      if (stats.isDirectory()) return resolve(removeDirectory(path));
      unlink(path, err => {
        if (err) return reject(err);
        resolve();
      });
    });
  });

const removeDirectory = path =>
  new Promise((resolve, reject) => {
    access(path, err => {
      if (err) return reject(err);
      readdir(path, (err, files) => {
        if (err) return reject(err);
        Promise.all(files.map(file => removeFile(join(path, file))))
          .then(() => {
            rmdir(path, err => {
              if (err) return reject(err);
              resolve();
            });
          })
          .catch(reject);
      });
    });
  });

module.exports = removeFile;
