export const hasSameValues = <T>(newData: Partial<T>, originalData: T): boolean => {
  const keys = Object.keys(newData);

  if (keys.length === 0) {
    return true;
  }
  
  return keys.every(key => {
    return originalData[key as keyof T] === newData[key as keyof T];
  });
}