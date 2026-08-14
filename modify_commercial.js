const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace component imports and usages
  content = content.replace(/DiagnosticEngine/g, 'CommercialDiagnosticEngine');
  content = content.replace(/DiagnosticResultSection/g, 'CommercialDiagnosticResultSection');
  content = content.replace(/LeadCaptureForm/g, 'CommercialLeadCaptureForm');
  content = content.replace(/OccupancySliderStep/g, 'CommercialOccupancySliderStep');
  content = content.replace(/SocialProofSection/g, 'CommercialSocialProofSection');
  content = content.replace(/SpatialLayoutStep/g, 'CommercialSpatialLayoutStep');
  content = content.replace(/StickyConsultBar/g, 'CommercialStickyConsultBar');
  content = content.replace(/ThreatVectorStep/g, 'CommercialThreatVectorStep');

  // Replace existing renamed files imports/usages
  content = content.replace(/Residential/g, 'Commercial');
  content = content.replace(/residential/g, 'commercial');
  
  // Specific wording changes for B2B
  content = content.replace(/Home Air Diagnosis/g, 'Commercial Air Diagnosis');
  content = content.replace(/Home Air Diagnostic/g, 'Commercial Air Diagnostic');
  content = content.replace(/home's air quality/g, "facility's air quality");
  content = content.replace(/your home/g, 'your workspace');
  content = content.replace(/Homeowner/g, 'Facility Manager');
  content = content.replace(/villa/g, 'building');

  // Fix doubled "CommercialCommercial" if any
  content = content.replace(/CommercialCommercial/g, 'Commercial');
  content = content.replace(/commercialcommercial/g, 'commercial');

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
console.log('Finished updating commercial features.');
