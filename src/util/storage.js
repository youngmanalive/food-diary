const TEST = 'test';
const DIARY = 'diary';

const isStorageSupported = () => {
  try {
    window.localStorage.setItem(TEST, TEST);
    const valid = window.localStorage.getItem(TEST) === TEST;
    window.localStorage.removeItem(TEST);
    return valid;
  } catch (error) {
    return false;
  }
};

class Storage {
  isSupported = isStorageSupported();

  fetch = () => {
    const diary = this.isSupported && window.localStorage.getItem(DIARY);
    try {
      return !!diary ? JSON.parse(diary) : [];
    } catch (error) {
      this.persist([]);
      return [];
    }
  };

  persist = diary => {
    if (this.isSupported) {
      window.localStorage.setItem(DIARY, JSON.stringify(diary));
    }
  };
}

export default new Storage();
