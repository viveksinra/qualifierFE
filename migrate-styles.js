const fs = require('fs');
const path = require('path');

// Files to process
const filesToProcess = [
  'src/Protected/Add/AddCategory.js',
  'src/Protected/Add/AddPromo.js',
  'src/Protected/Add/AddTestSeries.js',
  'src/Protected/Add/AddQuestion/QuesSearch.js',
  'src/Protected/Add/AddTest.js',
  'src/Protected/Add/AddSubject.js',
  'src/Protected/Add/AddCourse.js',
  'src/Protected/Add/AddChapter.js',
  'src/Protected/Add/AddBlog.js'
];

// Process each file
filesToProcess.forEach(filePath => {
  try {
    // Read the file content
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if file exists before proceeding
    if (!content) {
      console.log(`File not found: ${filePath}`);
      return;
    }
    
    // Replace useStyles import with styled import
    content = content.replace(
      /import useStyles from "\.\/(\.\.\/)?useStyles";/,
      `import { styled } from "@mui/material/styles";`
    );
    
    // Ensure we're importing Box from @mui/material
    if (!content.includes('Box') && content.includes('@mui/material')) {
      content = content.replace(
        /} from "@mui\/material";/,
        ',\n\tBox\n} from "@mui/material";'
      );
    }
    
    // Add styled components after imports section
    const importsEnd = content.indexOf('export default');
    if (importsEnd !== -1) {
      const styledComponents = `
// Styled components to replace useStyles
const EntryAreaPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(1),
  backgroundColor: theme.palette.background.paper
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1)
}));

const SearchResultDiv = styled('div')(({ theme }) => ({
  maxHeight: '80vh',
  overflow: 'auto',
  margin: theme.spacing(1)
}));

`;
      content = content.slice(0, importsEnd) + styledComponents + content.slice(importsEnd);
    }
    
    // Remove the line with const classes = useStyles();
    content = content.replace(/\s*const classes = useStyles\(\);/, '');
    
    // Replace className references
    content = content
      .replace(/className={classes\.entryArea}/g, 'component={EntryAreaPaper}')
      .replace(/className={classes\.button}/g, 'component={StyledButton}')
      .replace(/className={classes\.searchResult}/g, 'component={SearchResultDiv}')
      .replace(/<Paper className={classes\.entryArea}>/g, '<EntryAreaPaper>')
      .replace(/<\/Paper>(?!.*<\/Paper>)/g, '</EntryAreaPaper>')
      .replace(/<Button([^>]*) className={classes\.button}([^>]*)>/g, '<StyledButton$1$2>')
      .replace(/<\/Button>/g, '</StyledButton>')
      .replace(/<div className={classes\.searchResult}>/g, '<SearchResultDiv>')
      .replace(/<\/div>(?!.*<\/div>)/g, '</SearchResultDiv>');
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
});

console.log('Migration completed!'); 