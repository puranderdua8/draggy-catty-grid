
export async function getCats() {
    const response  = await fetch('cats.json', {
        headers:{
          accept: 'application/json',
        }
      });
    return response.json();
    
};