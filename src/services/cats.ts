// Helper to fetch list of cats from local JSON file
export async function getCats() {
    // Get data from API using fetch service
    const response  = await fetch('/api/cats', {
      headers: {
        accept: 'application/json'
      }
    });
    
    // Returns promise which will give the required data when awaited for/resolved
    // Mocking to delay the response so that the loader is visible
    return new Promise(resolve => setTimeout(resolve, 1000)).then (() => response.json());
};