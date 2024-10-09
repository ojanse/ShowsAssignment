import type {SimpleShow} from "@/api/shows";

export async function getCachedShows(): Promise<SimpleShow[]> {
  const worker = new Worker(new URL('@/cache/worker.ts', import.meta.url));
  return new Promise((resolve, reject) => {
    try {
      worker.addEventListener('message', (response) => {
        if (response.data.code === 'read') {
          const result = response.data.data as SimpleShow[];
          worker.terminate();
          resolve(result);
        }
      });
      worker.postMessage({
        command: 'read',
      });
    } catch (e) {
      worker.terminate();
      reject(e);
    }
  });
}

export async function updateCachedShows(shows: SimpleShow[]) {
  const worker = new Worker(new URL('@/cache/worker.ts', import.meta.url));

  worker.postMessage({
    command: 'write',
    data: shows,
  });

  worker.addEventListener('message', (response) => {
    if (response.data.code === 'write' && response.data.status === 'complete') {
      worker.terminate();
    }
  });
}