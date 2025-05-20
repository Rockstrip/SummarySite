const API_KEY = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY;
const PORTFOLIO_FOLDER_ID = import.meta.env.VITE_GOOGLE_DRIVE_PORTFOLIO_FOLDER_ID;

let projectImageMapCache = null;

async function getProjectFolders() {
  const q = `'${PORTFOLIO_FOLDER_ID}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`;
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&key=${API_KEY}&fields=files(id,name)`;
  const res = await fetch(url);
  const data = await res.json();
  return data.files; // список проектних папок
}

async function getFilesInFolder(folderId) {
  const q = `'${folderId}' in parents and trashed=false`;
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&key=${API_KEY}&fields=files(id,name,mimeType)`;
  const res = await fetch(url);
  const data = await res.json();
  return data.files;
}

export async function getAllProjectImages(imageName = 'logo') {
  if (projectImageMapCache) return projectImageMapCache;
  const projectFolders = await getProjectFolders();

  const result = {};
  await Promise.all(
    projectFolders.map(async (project) => {
      const files = await getFilesInFolder(project.id);
      const imageFile = files.find(
        f =>
          f.mimeType?.startsWith('image/') &&
          f.name.toLowerCase().includes(imageName.toLowerCase())
      );

      if (imageFile) {
        result[project.name] = {
          id: imageFile.id,
          name: imageFile.name,
          directLink: `https://drive.google.com/thumbnail?id=${imageFile.id}&sz=w1000`,
        };
      }
    })
  );

  projectImageMapCache = result;
  return result;
}

export async function getImageFromDrive(projectTitle, imageName = 'logo') {
  const imageMap = await getAllProjectImages(imageName);
  return imageMap[projectTitle] || null;
}
