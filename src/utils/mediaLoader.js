import fileMap from './fileMap.json';

/**
 * Створюємо мапу чистих назв проектів -> повні імена з префіксом
 */
const projectNameMap = {};
for (const fullName in fileMap) {
  // Припускаємо формат: "001_Samurai Warlords"
  // Відділяємо префікс і чисту назву через _
  const cleanName = fullName.replace(/^\d+_/, '').trim();
  projectNameMap[cleanName] = fullName;
}

/**
 * Отримати повне ім'я проекту з префіксом за чистим ім'ям
 * @param {string} cleanName
 * @returns {string | undefined}
 */
function getFullProjectName(cleanName) {
  return projectNameMap[cleanName];
}

/**
 * Отримати URL до конкретного медіафайлу
 */
export function getMedia(project, index) {
  const fullName = getFullProjectName(project);
  if (!fullName) return null;

  const ext = fileMap?.[fullName]?.[index];
  if (!ext) return null;
  return `/Portfolio/${fullName}/${index}.${ext}`;
}

/**
 * Отримати всі шляхи до медіафайлів проєкту (відсортовані по індексу)
 */
export function getAllMedia(project) {
    const fullName = getFullProjectName(project);
    if (!fullName) return [];
  
    const entries = fileMap[fullName];
    if (!entries) return [];
  
    const result = Object.entries(entries)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([index, ext]) => {
        const isVideo = ext === 'mp4';
  
        return {
          type: isVideo ? 'video' : 'image',
          src: `/Portfolio/${fullName}/${index}.${ext}`,
          id: isVideo ? `${fullName}/${index}` : undefined // if needed for thumbnails
        };
      });
  
    return result;
  }
  

/**
 * Отримати шляхи до всіх логотипів (0.[ext]) з усіх проєктів
 * Повертає { project: cleanName, url }
 */
export function getAllLogos() {
    const logos = {};
  
    Object.entries(fileMap).forEach(([fullName, files]) => {
      const ext = files['0']; // перевіряємо чи є логотип (файл з ім’ям "0")
      if (!ext) return;
  
      const cleanName = fullName.replace(/^\d+_/, '').trim();
      logos[cleanName] = `/Portfolio/${fullName}/0.${ext}`;
    });
  
    console.log(logos);
    return logos;
  }
  
  
  export function getAllProjectNames() {
    return Object.keys(fileMap).map(fullName =>
      fullName.replace(/^\d+_/, '').trim()
    );
  }
  