const fs = require('fs');
const html = fs.readFileSync('../frontend/index.html', 'utf8');
const matches = [...html.matchAll(/images\/([\w-]+\.(jpg|png))/g)];
const unique = [...new Set(matches.map(m => m[1]))];
unique.forEach(img => {
  try {
    fs.copyFileSync('../frontend/images/' + img, 'src/assets/' + img);
  } catch(e) {
    console.log(e);
  }
});
console.log('Done copying ' + unique.length + ' images.');
