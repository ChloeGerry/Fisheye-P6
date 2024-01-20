export const getMedia = async () => {
  try {
    const response = await fetch("http://127.0.0.1:5500/data/photographers.json");
    const data = await response.json();
    return {
      medias: data.media,
    };
  } catch (error) {
    console.log("error", error);
  }
};
