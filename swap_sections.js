const fs = require('fs');

// Read the backup file
const content = fs.readFileSync('client/src/pages/proposals.tsx.backup', 'utf8');
const lines = content.split('\n');

// Define section boundaries (line numbers - 1 for 0-based indexing)
const header = lines.slice(0, 38);  // Lines 1-38
const implementationRoadmap = lines.slice(38, 417);  // Lines 39-417
const emptyLine = [''];  // Line 418
const areasOfFocus = lines.slice(418, 842);  // Lines 419-842
const closing = lines.slice(842);  // Lines 843-end

// Reconstruct in new order: header + Areas of Focus + empty + Implementation Roadmap + closing
const newContent = [
  ...header,
  ...areasOfFocus,
  ...emptyLine,
  ...implementationRoadmap,
  ...closing
].join('\n');

// Write the new file
fs.writeFileSync('client/src/pages/proposals.tsx', newContent);
console.log('File restructured successfully!');
