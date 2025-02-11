export const isJson = async (str: string) => {
  try {
    await JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};
