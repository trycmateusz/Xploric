export const capitalizeFirstLetter = (text: string) => {
  const firstLetter = text[0].toUpperCase()
  const restOfString = text.slice(1)
  return firstLetter.concat(restOfString)
}
