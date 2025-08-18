const fs = require('fs');
const path = require('path');

// Read package.json
const packagePath = path.join(__dirname, '..', 'package.json');
const package = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

// Get current version
const currentVersion = package.version;
const [major, minor, patch] = currentVersion.split('.').map(Number);

// Determine next version based on commit messages
// This is a simple implementation - you might want to use conventional-changelog
const nextVersion = `${major}.${minor}.${patch + 1}`;

// Update package.json
package.version = nextVersion;
fs.writeFileSync(packagePath, JSON.stringify(package, null, 2) + '\n');

console.log(`Version bumped from ${currentVersion} to ${nextVersion}`);

// Update CHANGELOG.md
const changelogPath = path.join(__dirname, '..', 'CHANGELOG.md');
let changelog = fs.readFileSync(changelogPath, 'utf8');

// Add new version entry
const today = new Date().toISOString().split('T')[0];
const newEntry = `## [${nextVersion}] - ${today}

### Added
- Version bump to ${nextVersion}

`;

// Insert after the first ## line
const lines = changelog.split('\n');
const insertIndex = lines.findIndex(line => line.startsWith('## '));
if (insertIndex !== -1) {
    lines.splice(insertIndex + 1, 0, ...newEntry.split('\n'));
    changelog = lines.join('\n');
    fs.writeFileSync(changelogPath, changelog);
}

console.log('CHANGELOG.md updated');
