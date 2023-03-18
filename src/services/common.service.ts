export const convertName = (stringName: string) => {
  if (stringName?.indexOf("amazonaws.com") === -1) {
    return stringName
  }
  const urls = stringName?.split("/")
  let img = urls ? urls[urls.length - 1].split("?")[0] : ""
  return img
    ? img.substring(40, stringName.length - 1).replaceAll("%20", " ")
    : ""
}
