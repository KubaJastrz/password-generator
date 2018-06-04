class LocalStorage {
  static clearAll() {
    localStorage.clear();
  }

  static get(key, fallback = null) {
    if (!('localStorage' in window)) {
      return fallback;
    }

    const value = JSON.parse( localStorage.getItem(key) );

    if (value == null) {
      return fallback;
    }

    return value;
  }

  static set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static remove(key) {
    localStorage.removeItem(key);
  }
}

export default LocalStorage;