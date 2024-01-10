export async function getPhotographers() {
  try {
    const response = await fetch("http://127.0.0.1:5500/data/photographers.json");
    const data = await response.json();
    return {
      photographers: data.photographers,
    };
  } catch (error) {
    console.log("error", error);
  }
}
