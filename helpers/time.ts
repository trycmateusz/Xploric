export const convertToDate = (timestamp: number): string => {
  const date = new Date(timestamp)
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  return `${day}.${month}.${year} ${hours}:${minutes < 10 ? '0' + minutes : minutes}`
}

export const getDurationSeconds = (duration: number): number => {
  return Math.floor(duration % 60)
}

export const getDurationMinutes = (duration: number): number => {
  return Math.floor(duration / 60)
}

export const getDurationMinutesAndSecondsInProperFormatFromSeconds = (duration: number): string => {
  return `${getDurationMinutes(duration)}:${getDurationSeconds(duration) < 10 ? '0' + getDurationSeconds(duration) : getDurationSeconds(duration)}`
}
