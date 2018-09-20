"use strict";

const fs = require("fs");
const path = require("path");
const svgstore = require("svgstore");
const svgoOpts = require("./svg/options");
const Svgo = require("svgo");

const shapesOpts = {
  cleanSymbols: false,
  svgAttrs: {
    viewBox: "0 0 100 100",
    xmlns: "http://www.w3.org/2000/svg",
    style: "display:none"
  }
};

const shapes = svgstore(shapesOpts);
const svgo = new Svgo(svgoOpts);
const shapesDir = path.join(__dirname, "..", "source", "shapes");
const files = fs.readdirSync(shapesDir);

const promises = files.map(file => {
  svgo.optimize(fs.readFileSync(path.join(shapesDir, file))).then(result => {
    shapes.add("shape-" + path.basename(file, ".svg"), result.data);
  });
});

Promise.all(promises).then(() => {
  fs.writeFileSync(
    path.join(__dirname, "..", "source", "partials", "_shapes.html.erb"),
    shapes
  );
});
