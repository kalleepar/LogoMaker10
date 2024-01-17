const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function createSVGFile(text, textColor, shape, shapeColor) {
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
    <rect width="100%" height="100%" fill="${shapeColor}" />
    <text x="50%" y="50%" text-anchor="middle" fill="${textColor}" font-size="48">${text}</text>
  </svg>`;

  fs.writeFile('logo.svg', svgContent, (err) => {
    if (err) {
      console.log('Error creating SVG file:', err);
    } else {
      console.log('SVG file created: logo.svg');
    }
  });
}

rl.question('Enter up to three characters: ', (text) => {
  if (text.length <= 3) {
    rl.question('Enter the text color (keyword or hexadecimal): ', (textColor) => {
      rl.question('Choose a shape (circle, triangle, square): ', (shape) => {
        rl.question('Enter the shape color (keyword or hexadecimal): ', (shapeColor) => {
          createSVGFile(text, textColor, shape, shapeColor);
          rl.close();
        });
      });
    });
  } else {
    console.log('Please enter up to three characters.');
    rl.close();
  }
});