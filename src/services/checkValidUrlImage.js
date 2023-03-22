export function checkValidUrlImage(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}
