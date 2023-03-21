export const convertName = (stringName: string | any) => {
  if (!stringName) return
  stringName = typeof stringName == 'string' ? stringName : stringName[0].name
  if (stringName?.indexOf('amazonaws.com') === -1) {
    return stringName
  }
  const urls = stringName?.split('/')
  let img = urls ? urls[urls.length - 1].split('?')[0] : ''
  return img
    ? img.substring(40, stringName.length - 1).replaceAll('%20', ' ')
    : ''
}
