import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

  // TODO: Add logic to a method that accepts some content and adds it to the database
export async function putDb(content) {
  return console.error('putDb not implemented');
}

// TODO: Add logic for a method that gets all the content from the database
export async function getDb() {
  return console.error('getDb not implemented');
}

initdb();


// Function to add content to the database
export const putDb = async (content) => {
  try {
    const db = await initdb();
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    await store.put(content);
    await tx.done;
    console.log('Content added to the database');
  } catch (error) {
    console.error('Error adding content to the database:', error);
  }
};

// Function to get all content from the database
export const getDb = async () => {
  try {
    const db = await initdb();
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const allContent = await store.getAll();
    await tx.done;
    console.log('All content retrieved from the database:', allContent);
    return allContent;
  } catch (error) {
    console.error('Error getting content from the database:', error);
    return null;
  }
};

initdb(); // Initialize the database when the module is loaded
