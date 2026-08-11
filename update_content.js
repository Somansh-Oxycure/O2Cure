const fs = require('fs');

const contentPath = 'features/clientele/content.ts';
let content = fs.readFileSync(contentPath, 'utf8');

const newClients = fs.readFileSync('new_clients.txt', 'utf8').split('\n').filter(Boolean);

// Find the position to insert new clients
const insertPos = content.lastIndexOf('];');

const updatedClients = newClients.join('\n');
content = content.substring(0, insertPos) + updatedClients + '\n' + content.substring(insertPos);

// Count categories
const allClientsMatch = [...content.matchAll(/category:\s*["']([^"']+)["']/g)];
const counts = {};
allClientsMatch.forEach(m => {
  const cat = m[1];
  counts[cat] = (counts[cat] || 0) + 1;
});
const totalCount = allClientsMatch.length;

// Update CATEGORIES
content = content.replace(/\{ id: "all",\s*label: "All Partners",\s*count: \d+ \},/, `{ id: "all",           label: "All Partners",         count: ${totalCount} },`);

for (const cat in counts) {
  const regex = new RegExp(`(\\{ id: "${cat}",\\s*label: "[^"]+",\\s*count: )\\d+(\\s*\\})`);
  content = content.replace(regex, `$1${counts[cat]}$2`);
}

// Update scaleStats
content = content.replace(/\{ value: "\d+",\s*label: "Verified Partners" \}/, `{ value: "${totalCount}",  label: "Verified Partners" }`);

fs.writeFileSync(contentPath, content);
console.log('Updated content.ts with new clients and counts');
