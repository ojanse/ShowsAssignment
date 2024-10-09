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
  // Get handle to draft file
  const root = await navigator.storage.getDirectory();
  const draftHandle = await root.getFileHandle("shows.cache", { create: true });
  // Get sync access handle
  const accessHandle = await draftHandle.createSyncAccessHandle();
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(JSON.stringify(data));
  await accessHandle.write(encodedData);

  // Always close FileSystemSyncAccessHandle if done.
  accessHandle.close();

  postMessage({
    code: 'write',
    status: 'complete',
  });
}

async function clearFile() {
  // Get handle to draft file
  const root = await navigator.storage.getDirectory();
  const draftHandle = await root.getFileHandle("shows.cache", { create: true });
  // Get sync access handle
  const accessHandle = await draftHandle.createSyncAccessHandle();
  const encoder = new TextEncoder();
  const encodedData = encoder.encode('');
  await accessHandle.write(encodedData);

  // Always close FileSystemSyncAccessHandle if done.
  accessHandle.close();
}

async function getData() {
  const root = await navigator.storage.getDirectory();
  try {
    const draftHandle = await root.getFileHandle("shows.cache");

    const file = await draftHandle.getFile();
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
