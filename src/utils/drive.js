// drive.js
const API_KEY = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY;
const PORTFOLIO_FOLDER_ID = import.meta.env.VITE_GOOGLE_DRIVE_PORTFOLIO_FOLDER_ID;

let cachedProjectFolders = null;
let cachedFolderContents = {};

async function fetchFromDrive(query, fields = 'files(id,name,mimeType)', extra = '') {
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&key=${API_KEY}&fields=${fields}${extra}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Google Drive API error');
  return await res.json();
}

export async function getProjectFolders() {
  if (cachedProjectFolders) return cachedProjectFolders;
  const query = `'${PORTFOLIO_FOLDER_ID}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`;
  const { files } = await fetchFromDrive(query);
  cachedProjectFolders = files;
  return files;
}

export async function getFolderContents(folderId) {
  if (cachedFolderContents[folderId]) return cachedFolderContents[folderId];
  const query = `'${folderId}' in parents and trashed=false`;
  const { files } = await fetchFromDrive(query);
  cachedFolderContents[folderId] = files;
  return files;
}

export async function getAllProjectLogos() {
  const folders = await getProjectFolders();
  const result = {};
  await Promise.all(folders.map(async ({ id, name }) => {
    const files = await getFolderContents(id);
    const logo = files.find(f => f.name === '0.jpg' || f.name === '0.png' || f.name === '0.webp');
    if (logo) {
      result[name] = `https://drive.google.com/thumbnail?id=${logo.id}&sz=w1000`;
    }
  }));
  return result;
}

export async function getAllProjectMedia(projectTitle) {
  const folders = await getProjectFolders();
  const folder = folders.find(f => f.name === projectTitle);
  if (!folder) throw new Error(`Folder not found for project: ${projectTitle}`);

  const files = await getFolderContents(folder.id);

  const media = files
    .map(f => {
      const ext = f.name.split('.').pop().toLowerCase();
      const isVideo = ext === 'mp4';
      const isImage = ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext);
      const type = isVideo ? 'video' : isImage ? 'image' : 'other';
      return {
        id: f.id,
        name: f.name,
        type,
        src: isVideo
          ? `https://drive.google.com/uc?id=${f.id}`
          : `https://drive.google.com/thumbnail?id=${f.id}&sz=w1000`
      };
    });

  // Sort by numeric order if named 1, 2, 3, etc.
  return media.sort((a, b) => {
    const numA = parseInt(a.name);
    const numB = parseInt(b.name);
    return (isNaN(numA) ? 0 : numA) - (isNaN(numB) ? 0 : numB);
  });
}