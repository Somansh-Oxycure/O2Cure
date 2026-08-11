const fs = require('fs');
const path = require('path');

const contentPath = 'features/clientele/content.ts';
let content = fs.readFileSync(contentPath, 'utf8');

// Step 1: Remove all lines containing '/Clients/new/'
let lines = content.split('\n');
lines = lines.filter(line => !line.includes('/Clients/new/'));
content = lines.join('\n');

// Find where the clients array ends
const insertPos = content.lastIndexOf('];');

// Find all existing src values
const existingSrcMatch = [...content.matchAll(/src:\s*["']([^"']+)["']/g)];
const existingSrcs = new Set(existingSrcMatch.map(m => m[1]));

// Step 2: Read public/client_logos
const logosDir = path.join('public', 'client_logos');
const files = fs.readdirSync(logosDir).filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.svg') || f.endsWith('.jpeg'));

// Identify unadded files
const unaddedFiles = files.filter(f => !existingSrcs.has(`/client_logos/${f}`));

const newEntries = [];

// Simple heuristics for categories based on name
function getCategory(name) {
    const n = name.toLowerCase();
    if (n.includes('hospital') || n.includes('pharma') || n.includes('care') || n.includes('health') || n.includes('med') || n.includes('reddy') || n.includes('aiims') || n.includes('clinic')) return 'healthcare';
    if (n.includes('school') || n.includes('univ') || n.includes('institute') || n.includes('iim') || n.includes('isb')) return 'education';
    if (n.includes('bank') || n.includes('fin') || n.includes('hdfc') || n.includes('lic') || n.includes('kpmg')) return 'finance';
    if (n.includes('tv') || n.includes('news') || n.includes('media') || n.includes('network') || n.includes('tele') || n.includes('airtel') || n.includes('jio') || n.includes('vodafone')) return 'media';
    if (n.includes('hotel') || n.includes('resort') || n.includes('pvr') || n.includes('inox') || n.includes('gym') || n.includes('club') || n.includes('mall')) return 'hospitality';
    if (n.includes('airport') || n.includes('air') || n.includes('indigo') || n.includes('gmr')) return 'airports';
    if (n.includes('police') || n.includes('gov') || n.includes('ministry') || n.includes('army') || n.includes('force') || n.includes('drdo') || n.includes('isro')) return 'government';
    if (n.includes('dlf') || n.includes('m3m') || n.includes('reality') || n.includes('infra') || n.includes('builder') || n.includes('estate') || n.includes('group') || n.includes('corp') || n.includes('sattva')) return 'real-estate';
    if (n.includes('power') || n.includes('steel') || n.includes('oil') || n.includes('gas') || n.includes('energy') || n.includes('tech') || n.includes('l_and_t')) return 'industrial';
    return 'corporate';
}

function cleanName(filename) {
    let name = filename.replace(/\.[^/.]+$/, ""); // remove extension
    name = name.replace(/_/g, ' '); // replace underscores
    name = name.replace(/-/g, ' '); // replace dashes
    return name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
}

for (const f of unaddedFiles) {
    const name = cleanName(f);
    const cat = getCategory(name);
    // ensure id is valid (letters, numbers, hyphens)
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    newEntries.push(`  { id: "${id}", name: "${name}", src: "/client_logos/${f}", category: "${cat}" },`);
}

const updatedClientsStr = newEntries.join('\n');
content = content.substring(0, insertPos) + updatedClientsStr + '\n' + content.substring(insertPos);

// Count categories
const allClientsMatch = [...content.matchAll(/category:\s*["']([^"']+)["']/g)];
const counts = {};
allClientsMatch.forEach(m => {
  const cat = m[1];
  counts[cat] = (counts[cat] || 0) + 1;
});
const totalCount = allClientsMatch.length;

// Update CATEGORIES count
content = content.replace(/\{ id: "all",\s*label: "All Partners",\s*count: \d+ \},/, `{ id: "all",           label: "All Partners",         count: ${totalCount} },`);

for (const cat in counts) {
  const regex = new RegExp(`(\\{ id: "${cat}",\\s*label: "[^"]+",\\s*count: )\\d+(\\s*\\})`);
  content = content.replace(regex, `$1${counts[cat]}$2`);
}

// Update scaleStats
content = content.replace(/\{ value: "\d+",\s*label: "Verified Partners" \}/, `{ value: "${totalCount}",  label: "Verified Partners" }`);

fs.writeFileSync(contentPath, content);
console.log('Successfully updated content.ts with ' + unaddedFiles.length + ' new clients from client_logos.');
