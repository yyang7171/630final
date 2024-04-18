async function loadData(url) {
    const results = await fetch(url);
    const storedList = await results.json();
  
    return storedList;
  }
  
  async function mainEvent() {
    const data = await loadData(
      "https://api.artic.edu/api/v1/artworks/search?params=%7B%22q%22%3A%22cats%22%2C%22query%22%3A%7B%22term%22%3A%7B%22is_public_domain%22%3Atrue%7D%7D%7D"
    );
  }
  console.table(data)
  document.addEventListener("DOMContentLoaded", async () => mainEvent());
  