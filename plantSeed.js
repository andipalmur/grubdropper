// Dev tool to prepare seed.js file from mp3 directory
const fs = require('fs')

const files = fs.readdirSync('./public/drops/');
const fileObj = files.map(name => {
  let keyVal = `
  {
    name: "${name.slice(0,-4)}",
    src: "${'/drops/' + name}",
    label: "${name.replace(/\s/g, '').slice(0,-4)}"
  }`;
  return keyVal;
});



const data = `const files = [
  ${String(fileObj)}
];
exports.Seed = files;`;

fs.writeFileSync('./src/assets/seed.js', data, err => {
  if (err) {
    console.error(err);
    return
  }
});
