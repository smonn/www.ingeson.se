const { renderFile } = require("pug");
const { join } = require("path");
const remove = require("./lib/remove");
const write = require("./lib/write");
const sass = require("./lib/sass");
const copy = require('./lib/copy');

const PATHS = {
  dist: join(__dirname, "dist"),
  src: join(__dirname, "src")
};

const html = renderFile(join(PATHS.src, "index.pug"));

remove(PATHS.dist)
  .then(() => write(join(PATHS.dist, "index.html"), html))
  .then(() => sass(join(PATHS.src, "style.scss")))
  .then(css => write(join(PATHS.dist, "style.css"), css))
  .then(() =>
    copy(join(PATHS.src, "favicon.ico"), join(PATHS.dist, "favicon.ico"))
  )
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
