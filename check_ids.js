const fs = require('fs');
const catalogPath = 'c:/Users/Somansh/Desktop/New folder/O2Cure/features/solutions/data/productCatalog.ts';
const detailPath = 'c:/Users/Somansh/Desktop/New folder/O2Cure/features/solutions/data/productDetailData.ts';
const catalog = fs.readFileSync(catalogPath, 'utf8');
const detail = fs.readFileSync(detailPath, 'utf8');

const catalogIds = [...catalog.matchAll(/id:\s*[\"']([^\"']+)[\"']/g)].map(m => m[1]);
const detailIds = [...detail.matchAll(/id:\s*[\"']([^\"']+)[\"']/g)].map(m => m[1]);

const nonProductIds = ['compact','mid','large','enterprise','all','corporate','healthcare','residential','industrial','education','datacenter','particulate','odor-gases','high-co2','pathogens','in-duct','standalone','portable','fresh-air','b2b','b2c','both'];

console.log('In Catalog but not in Details:', catalogIds.filter(id => !detailIds.includes(id) && !nonProductIds.includes(id)));
console.log('In Details but not in Catalog:', detailIds.filter(id => !catalogIds.includes(id) && !nonProductIds.includes(id)));
