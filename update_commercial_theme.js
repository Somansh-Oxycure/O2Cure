const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Colors mapping for Commercial Theme (Corporate Slate & Blue)
  // Accent gold -> Blue
  content = content.replace(/#C5A059/g, '#2563EB'); // Blue 600
  content = content.replace(/#A88746/g, '#1D4ED8'); // Blue 700 (hover)
  content = content.replace(/#D4B370/g, '#3B82F6'); // Blue 500 (gradient)
  
  // Warm off-whites -> Cool Slate off-whites
  content = content.replace(/#FDFBF7/g, '#F8FAFC'); // Slate 50
  content = content.replace(/#F7F5F0/g, '#F1F5F9'); // Slate 100
  content = content.replace(/#F7FAFD/g, '#F8FAFC'); // Slate 50 (bg)

  // Dark brown/text -> Slate dark
  content = content.replace(/#1A1C19/g, '#0F172A'); // Slate 900
  content = content.replace(/#1C1C1C/g, '#0F172A'); // Slate 900
  content = content.replace(/#8B7C62/g, '#475569'); // Slate 600 (subheadings)

  fs.writeFileSync(filePath, content, 'utf8');
}

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      replaceInFile(fullPath);
    }
  }
}

const targetDir = path.join(__dirname, 'features/commercial');
processDir(targetDir);
console.log('Finished updating commercial theme colors.');
