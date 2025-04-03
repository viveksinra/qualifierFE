const fs = require('fs');
const path = require('path');

const testHomeDir = path.join(__dirname, 'src', 'Test', 'TestHome');

// Function to fix CDATA in style tags and other SVG issues
function fixSvgContent(content) {
  // Fix CDATA issues in style tags
  let fixedContent = content.replace(/<style[^>]*>\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*<\/style>/g, 
    (match, styleContent) => `<style type="text/css">${styleContent}</style>`
  );
  
  // Add XML declaration if missing
  if (!fixedContent.trim().startsWith('<?xml')) {
    if (fixedContent.trim().startsWith('<svg')) {
      fixedContent = '<?xml version="1.0" encoding="UTF-8"?>\n' + fixedContent;
    }
  }
  
  // Fix self-closing tags
  fixedContent = fixedContent.replace(/<([a-zA-Z0-9]+)([^>]*)\/>/g, '<$1$2></$1>');
  
  // Fix any potential namespace issues
  fixedContent = fixedContent.replace(/xmlns:NS\d+=""/g, '');
  
  // Fix IRI references in masks, clip paths, etc.
  fixedContent = fixedContent.replace(/url\(("|')?#([^")]+)("|')?\)/g, 'url(#$2)');
  
  // Fix potential style attribute issues
  fixedContent = fixedContent.replace(/style="([^"]*)"/g, (match, styleContent) => {
    // Replace any invalid CSS properties or values
    const fixedStyle = styleContent
      .replace(/;+/g, ';')  // Remove duplicate semicolons
      .replace(/;$/g, '')   // Remove trailing semicolons
      .replace(/:\s+/g, ':') // Remove extra space after colon
      .replace(/\s+;/g, ';'); // Remove extra space before semicolon
    
    return `style="${fixedStyle}"`;
  });
  
  return fixedContent;
}

// Process all SVG files in the TestHome directory
fs.readdir(testHomeDir, (err, files) => {
  if (err) {
    console.error('Error reading TestHome directory:', err);
    return;
  }

  const svgFiles = files.filter(file => path.extname(file).toLowerCase() === '.svg');
  
  console.log(`Found ${svgFiles.length} SVG files to process in TestHome directory`);
  
  svgFiles.forEach(file => {
    const filePath = path.join(testHomeDir, file);
    
    console.log(`Processing ${file}...`);
    
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file ${file}:`, err);
        return;
      }
      
      const fixedContent = fixSvgContent(data);
      
      fs.writeFile(filePath, fixedContent, 'utf8', (err) => {
        if (err) {
          console.error(`Error writing fixed SVG to ${file}:`, err);
          return;
        }
        
        console.log(`Fixed ${file}`);
      });
    });
  });
}); 