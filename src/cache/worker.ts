import type {SimpleShow} from "@/api/shows";

onmessage = async (event) => {
  if (event.data.command === 'read') {
    await getData();
  } else if (event.data.command === 'clear') {
    await clearFile();
  } else {
    await replaceData(event.data.data);
  }
};

interface FileSystemFileHandleWithSyncAccess extends FileSystemFileHandle {
  createWritable: () => Promise<any>;
}

async function replaceData(data: SimpleShow[] ) {
  const root = await navigator.storage.getDirectory();
  const fileHandle = await root.getFileHandle("shows.cache", { create: true }) as FileSystemFileHandleWithSyncAccess;

  const writable = await fileHandle.createWritable();
  await writable.write(JSON.stringify(data));
  await writable.close();

  postMessage({
    code: 'write',
    status: 'complete',
  });
}

async function clearFile() {
  const root = await navigator.storage.getDirectory();
  const fileHandle = await root.getFileHandle("shows.cache", { create: true }) as FileSystemFileHandleWithSyncAccess;

  const writable = await fileHandle.createWritable();
  await writable.write('');
  await writable.close();

  postMessage({
    code: 'clear',
    status: 'complete',
  });
}

async function getData() {
  const root = await navigator.storage.getDirectory();
  try {
    const fileHandle = await root.getFileHandle("shows.cache");

    const file = await fileHandle.getFile();
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = function() {
      const result = reader.result?.toString();

      postMessage({
        code: 'read',
        status: 'complete',
        data: result ? JSON.parse(result) : [],
      });
    };

    reader.onerror = function() {
      postMessage({
        code: 'read',
        status: 'error',
        data: [],
      });
    };
  } catch (e) {
    postMessage({
      code: 'read',
      status: 'error',
      data: [],
    });
  }
}
