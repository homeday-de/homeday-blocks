import { loadScript } from 'hd-blocks/services/utils';

let mapsApiPromise = null;

export function getGoogleAPI(key) {
  if (mapsApiPromise) {
    return mapsApiPromise;
  }

  mapsApiPromise = new Promise((resolve) => {
    loadScript({
      url: `https://maps.googleapis.com/maps/api/js?v=3.37&key=${key}&libraries=places&region=DE`,
    }).then(() => {
      resolve(window.google);
    }).catch(() => {
      mapsApiPromise = null;
    });
  });
  return mapsApiPromise;
}

export default {
  getGoogleAPI,
};
