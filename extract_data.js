const fs = require('fs');

const extractInfo = (filePath, name) => {
  const content = fs.readFileSync(filePath, 'utf8');
  
  const titleMatch = content.match(/<title>(.*?)<\/title>/);
  const title = titleMatch ? titleMatch[1] : 'No title';
  
  const descMatch = content.match(/<meta name=\"description\" content=\"(.*?)\"/);
  const description = descMatch ? descMatch[1] : 'No description';
  
  const priceMatch = content.match(/\"price\":\"(\d+)\"/);
  const price = priceMatch ? priceMatch[1] : 'No price';
  
  // also grab any paragraph texts that might have product details
  const paragraphs = [...content.matchAll(/<p>(.*?)<\/p>/g)].map(m => m[1].replace(/<[^>]*>?/gm, ''));
  
  console.log(`\n--- ${name} ---`);
  console.log('Title:', title);
  console.log('Description:', description);
  console.log('Price:', price);
  console.log('Paragraphs:', paragraphs.slice(0, 5)); // First few paragraphs
};

extractInfo('C:/Users/Somansh/.gemini/antigravity-ide/brain/639827fb-8ba4-408e-a87e-f822221c0741/.system_generated/steps/39/content.md', 'Elixir');
extractInfo('C:/Users/Somansh/.gemini/antigravity-ide/brain/639827fb-8ba4-408e-a87e-f822221c0741/.system_generated/steps/40/content.md', 'Hulk');
