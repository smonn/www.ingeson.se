const sass = require("node-sass");

const render = file =>
  new Promise((resolve, reject) => {
    sass.render(
      {
        file
      },
      (err, result) => {
        if (err) return reject(err);
        resolve(result.css);
      }
    );
  });

module.exports = render;
