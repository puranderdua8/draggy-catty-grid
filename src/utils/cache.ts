import type {Cat} from '../models/cats';

export async function storeCatsInCache(catObj: {cats: Cat[]}, isMount:boolean = false) {
    const cache = await caches.open('cats-cache');
    if (isMount) {
      const existingCats = await cache.match('/api/cats');
      if (existingCats) {
        return Promise.resolve();
      }
    }
    const jsonBlob = new Blob([JSON.stringify(catObj)], { type: 'application/json' });
    const response = new Response(jsonBlob);
    await cache.put('/api/cats', response);
  }