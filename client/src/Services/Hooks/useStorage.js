export const useStorage = () => {
  const saveToStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const getFromStorage = (key) => {
    const storedItem = localStorage.getItem(key);
    return storedItem ? JSON.parse(storedItem) : null;
  };

  const removeFromStorage = (key) => {
    localStorage.removeItem(key);
  };

  return { saveToStorage, getFromStorage, removeFromStorage };
};
