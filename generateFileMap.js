import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname в ES модулях отримуємо так:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const portfolioPath = path.join(__dirname, 'public', 'Portfolio');
const outputPath = path.join(__dirname, 'src', 'utils', 'fileMap.json');

function generateFileMap() {
  const projects = fs.readdirSync(portfolioPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory());

  const fileMap = {};

  projects.forEach(project => {
    const projectName = project.name;
    const projectDir = path.join(portfolioPath, projectName);
    const files = fs.readdirSync(projectDir);

    fileMap[projectName] = {};

    files.forEach(file => {
      const match = file.match(/^(\d+)\.(\w+)$/);
      if (match) {
        const index = match[1];
        const ext = match[2];
        fileMap[projectName][index] = ext;
      }
    });
  });

  fs.writeFileSync(outputPath, JSON.stringify(fileMap, null, 2));
  console.log(`File map saved to ${outputPath}`);
}

generateFileMap();
