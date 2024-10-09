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

async function replaceData(data: SimpleShow[] ) {
  const root = await navigator.storage.getDirectory();
  const fileHandle = await root.getFileHandle("shows.cache", { create: true });

  const syncAccessHandle = await fileHandle.createSyncAccessHandle();
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(JSON.stringify(data));
  await syncAccessHandle.write(encodedData);

  syncAccessHandle.close();

  postMessage({
    code: 'write',
    status: 'complete',
  });
}

async function clearFile() {
  const root = await navigator.storage.getDirectory();
  const fileHandle = await root.getFileHandle("shows.cache", { create: true });

  const syncAccessHandle = await fileHandle.createSyncAccessHandle();
  const encoder = new TextEncoder();
  const encodedData = encoder.encode('');
  await syncAccessHandle.write(encodedData);

  syncAccessHandle.close();
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
