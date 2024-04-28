// Helper to fetch list of cats from local JSON file
export async function getCats() {
    // Get using fetch service
    const response  = await fetch('cats.json', {
        headers:{
          accept: 'application/json',
        }
      });
      // Returns promise which will give the required data when awaited for/resolved
    return response.json();
    
};