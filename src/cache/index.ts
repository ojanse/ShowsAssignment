import type {SimpleShow} from "@/api/shows";

export async function getCachedShows(): Promise<SimpleShow[]> {
  const opfsWorker = new Worker(new URL('@/cache/worker.ts', import.meta.url));
  return new Promise((resolve, reject) => {
    try {
      opfsWorker.addEventListener('message', (response) => {
        if (response.data.code === 'read') {
          const result = response.data.data as SimpleShow[];
          opfsWorker.terminate();
          resolve(result);
        }
      });
      opfsWorker.postMessage({
        command: 'read',
      });
    } catch (e) {
      console.log('error');
      opfsWorker.terminate();
      reject(e);
    }
  });
}

export async function updateCachedShows(shows: SimpleShow[]) {
  const opfsWorker = new Worker(new URL('@/cache/worker.ts', import.meta.url));

  opfsWorker.postMessage({
    command: 'write',
    data: shows,
  });

  opfsWorker.addEventListener('message', (response) => {
    if (response.data.code === 'write' && response.data.status === 'complete') {
      opfsWorker.terminate();
    }
  });
}