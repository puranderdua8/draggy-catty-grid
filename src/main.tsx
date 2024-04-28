import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { mockCats } from './config/data.ts';

async function storeCatsInCache() {
  const cache = await caches.open('cats-cache');
  const jsonBlob = new Blob([JSON.stringify(mockCats)], { type: 'application/json' });
  const response = new Response(jsonBlob);
  await cache.put('/api/cats', response);
}

// Helper to start the mock service worker
async function enableMockServiceWorker() {
  if (process.env.NODE_ENV !== 'development') {
    return
  }
  
  // Storing data in cache
  await storeCatsInCache();

  // initializing and starting the mock service worker
  const { worker } = await import('./mocks/browser');
  return worker.start();
}

// Mounting the UI once the mock service worker is ready
enableMockServiceWorker().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
});
