const fs = require('fs');
const path = require('path');

// Files that need to be updated
const files = [
  'src/Protected/Add/AddSubject.js',
  'src/Protected/Add/AddTest.js',
  'src/Protected/Add/AddSection.js',
  'src/Protected/Add/AddPromo.js',
  'src/Protected/Add/AddCourse.js',
  'src/Protected/Add/AddChapter.js',
  'src/Protected/Add/AddQuestion/Section1.js',
  'src/Protected/Add/AddBlog.js'
];

// Regular expressions for replacements
const replacements = [
  {
    from: /import Autocomplete from "@material-ui\/lab\/Autocomplete";/g,
    to: 'import Autocomplete from "@mui/material/Autocomplete";'
  },
  {
    from: /import { createStyles, makeStyles, Theme } from "@material-ui\/core\/styles";/g,
    to: 'import { styled } from "@mui/material/styles";'
  },
  {
    from: /import useStyles from '.\/useStyles';/g,
    to: '// Material UI styles are now implemented using the styled API'
  }
];

// Process each file
files.forEach(filePath => {
  try {
    const fullPath = path.resolve(__dirname, filePath);
    
    // Read the file content
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Apply all replacements
    replacements.forEach(({ from, to }) => {
      content = content.replace(from, to);
    });
    
    // Write the updated content back to the file
    fs.writeFileSync(fullPath, content, 'utf8');
    
    console.log(`Updated: ${filePath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
});

console.log('Import update complete!'); 