class LocalStorage {
  static debug = false;

  static clearAll() {
    localStorage.clear();
    
    if (this.debug) {
      console.log(`Cleared localStorage`);
    }
  }

  static get(key) {
    const value = JSON.parse( localStorage.getItem(key) );

    if (this.debug) {
      console.log(`Got '${key}' with value of `, value);
    }

    return value;
  }

  static set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));

    if (this.debug) {
      console.log(`Set '${key}' with value of `, value);
    }
  }

  static remove(key) {
    localStorage.removeItem(key);

    if (this.debug) {
      console.log(`Removed '${key}'`);
    }
  }
}

export default LocalStorage;