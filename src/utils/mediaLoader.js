import fileMap from './fileMap.json';
import projects from './projects.json';

/**
 * Отримати URL до конкретного медіафайлу
 * @param {string} projectName
 * @param {string | number} index
 * @returns {string | null}
 */
export function getMedia(projectName, index) {
  const ext = fileMap?.[projectName]?.[index];
  if (!ext) return null;
  return `/Portfolio/${projectName}/${index}.${ext}`;
}

/**
 * Отримати всі шляхи до медіафайлів проєкту (відсортовані по індексу)
 * @param {string} projectName
 * @returns {Array<{ type: string, src: string, id?: string }>}
 */
export function getAllMedia(projectName) {
  const entries = fileMap?.[projectName];
  if (!entries) return [];

  return Object.entries(entries)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([index, ext]) => {
      const isVideo = ext === 'mp4';
      return {
        type: isVideo ? 'video' : 'image',
        src: `/Portfolio/${projectName}/${index}.${ext}`,
        id: isVideo ? `${projectName}/${index}` : undefined
      };
    });
}

/**
 * Повертає масив проектів із доданим шляхом до логотипу
 * @returns {Array} масив об'єктів проектів з полем logoUrl
 */
export function GetPortfolio() {
  return projects.map(project => {
    // Знайти повне ім'я проекту у fileMap, яке відповідає project.title
    const fullName = Object.keys(fileMap).find(fullName =>
      fullName.replace(/^\d+_/, '').trim() === project.title
    );

    // Якщо знайшли, отримуємо розширення логотипу (файл 0)
    const logoExt = fullName ? fileMap[fullName]['0'] : null;

    // Формуємо URL логотипу, якщо є
    const logoUrl = fullName && logoExt ? `/Portfolio/${fullName}/0.${logoExt}` : null;

    return {
      ...project,
      logoUrl
    };
  });
}


/**
 * Отримати список всіх назв проєктів з projects.json
 * @returns {string[]}
 */
export function getAllProjectNames() {
  return projects.map(p => p.title);
}
