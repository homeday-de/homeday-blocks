import { loadScript } from 'homeday-blocks/src/services/utils';

let mapsApiPromise = null;

export function getGoogleAPI(key) {
  if (mapsApiPromise) {
    return mapsApiPromise;
  }

  mapsApiPromise = new Promise((resolve) => {
    // Check Google Maps version documentation: https://developers.google.com/maps/documentation/javascript/versions
    const version = '3.42';
    const url = `https://maps.googleapis.com/maps/api/js?v=${version}&key=${key}&libraries=places&region=DE`;
    if (document.querySelector(`script[src="${url}"]`)) {
      resolve();
    } else {
      loadScript({ url }).then(() => {
        resolve(window.google);
      }).catch(() => {
        mapsApiPromise = null;
      });
    }
  });
  return mapsApiPromise;
}

export default {
  getGoogleAPI,
};
