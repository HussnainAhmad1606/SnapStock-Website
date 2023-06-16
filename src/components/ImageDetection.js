import * as nsfwjs from 'nsfwjs';

export async function checkImageForAdultContent(imageUrl) {
  const model = await nsfwjs.load();

  const img = await loadImage(imageUrl);
  const predictions = await model.classify(img);

  const adultPrediction = predictions.find(
    (prediction) => prediction.className === 'Porn'
  );

  return adultPrediction.probability > 0.5;
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = src;

    img.onload = () => resolve(img);
    img.onerror = (error) => reject(error);
  });
}
