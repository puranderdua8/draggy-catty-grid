import { setupWorker } from 'msw/browser';
import {http, HttpResponse} from 'msw';

export const worker = setupWorker(
   http.get('/api/cats', (async () => {
      const cachedCats = await caches.open('cats-cache');
      const response = await cachedCats.match('/api/cats');
      const cats = await response?.json() ?? {};
      return HttpResponse.json(cats);
      })
   )
);