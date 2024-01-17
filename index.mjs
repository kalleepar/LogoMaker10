import { writeFile } from 'fs/promises';
import inquirer from 'inquirer';

async function createSVGFile(text, textColor, shape, shapeColor) {
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
    <rect width="100%" height="100%" fill="${shapeColor}" />
    <text x="50%" y="50%" text-anchor="middle" fill="${textColor}" font-size="48">${text}</text>
  </svg>`;

  try {
    await writeFile('logo.svg', svgContent);
    console.log('SVG file created: logo.svg');
    console.log('Generated logo.svg');
    console.log('To view the image, open logo.svg in a web browser.');
  } catch (err) {
    console.log('Error creating SVG file:', err);
  }
}

inquirer
  .prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter up to three characters:',
      validate: function (value) {
        if (value.length <= 3) {
          return true;
        }
        return 'Please enter up to three characters.';
      }
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter the text color (keyword or hexadecimal):'
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Choose a shape:',
      choices: ['circle', 'triangle', 'square']
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter the shape color (keyword or hexadecimal):'
    }
  ])
  .then((answers) => {
    createSVGFile(answers.text, answers.textColor, answers.shape, answers.shapeColor);
  });