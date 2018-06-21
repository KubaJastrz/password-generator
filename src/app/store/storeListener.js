import LocalStorage from '~/app/LocalStorage';

const keysToCompare = ['options', 'presets'];

function compareObjects(obj1, obj2) {
  const s = o => JSON.stringify(o);
  return s(obj1) === s(obj2);
}

let currentState = {};

function storeListener(store) {
  let previousState = currentState;
  currentState = store.getState();

  keysToCompare.forEach(key => {
    const equal = compareObjects(currentState[key], previousState[key]);

    if (!equal) {
      LocalStorage.set(key, currentState[key]);
    }
  });
}

export default storeListener;