import type {SimpleShow} from "@/api/shows";

// Only allow cache usage in chromium or firefox for now. Apologies for the use of 'any', it's a quick fix.
const canUseCache = () => {
  const isChromium = !!(window as any).chrome || /chrom(e|ium)/.test(navigator.userAgent.toLowerCase());
  const isFirefox = typeof (window as any).InstallTrigger !== 'undefined';
  return isChromium || isFirefox;
};

export async function getCachedShows(): Promise<SimpleShow[]> {
  if (!canUseCache()) {
    return [];
  }

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
  if (!canUseCache()) {
    return;
  }

  const worker = new Worker(new URL('@/cache/worker.ts', import.meta.url));
  return new Promise((resolve, reject) => {
    try {
      worker.postMessage({
        command: 'write',
        data: shows,
      });

      worker.addEventListener('message', (response) => {
        if (response.data.code === 'write' && response.data.status === 'complete') {
          worker.terminate();
          resolve(true);
        }
      });
    } catch (e) {
      worker.terminate();
      reject(e);
    }
  });
}

export async function clearCachedShows() {
  if (!canUseCache()) {
    return;
  }

  const worker = new Worker(new URL('@/cache/worker.ts', import.meta.url));
  return new Promise((resolve, reject) => {
    try {
      worker.postMessage({
        command: 'clear',
      });

      worker.addEventListener('message', (response) => {
        if (response.data.code === 'clear' && response.data.status === 'complete') {
          worker.terminate();
          resolve(true);
        }
      });
    } catch (e) {
      worker.terminate();
      reject(e);
    }
  });
}