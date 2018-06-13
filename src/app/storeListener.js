import LocalStorage from './LocalStorage';

function compareObjects(obj1, obj2) {
  const s = o => JSON.stringify(o);
  return s(obj1) === s(obj2);
}

let currentOptions;

function storeListener(store) {
  let previousOptions = currentOptions;

  const state = store.getState();
  currentOptions = state.options;

  if (!compareObjects(previousOptions, currentOptions)) {
    LocalStorage.set('options', currentOptions);
  }
}

export default storeListener;