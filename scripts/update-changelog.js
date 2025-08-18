const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
    // Generate changelog using conventional-changelog
    console.log('Generating changelog...');
    execSync('npm run changelog:generate', { stdio: 'inherit' });

    // Read the updated changelog
    const changelogPath = path.join(__dirname, '..', 'CHANGELOG.md');
    let changelog = fs.readFileSync(changelogogPath, 'utf8');

    // Ensure proper formatting
    if (!changelog.startsWith('# Changelog')) {
        console.error('Changelog generation failed');
        process.exit(1);
    }

    console.log('Changelog updated successfully');
} catch (error) {
    console.error('Error updating changelog:', error.message);
    process.exit(1);
}
