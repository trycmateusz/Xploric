export const convertToDate = (timestamp: number): string => {
  const date = new Date(timestamp)
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  return `${day}.${month}.${year} ${hours}:${minutes}`
}
