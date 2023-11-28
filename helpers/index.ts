export const convertToDate = (timestamp: number): string => {
  const date = new Date(timestamp)
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  return `${day}.${month}.${year} ${hours}:${minutes}`
}

export const getDurationSeconds = (duration: number): number => {
  return duration / 1000 % 60
}

export const getDurationMinutes = (duration: number): number => {
  return duration % 1000 % 60
}

export const getDurationMinutesAndSecondsInProperFormat = (duration: number): string => {
  return `${getDurationMinutes(duration)}:${getDurationSeconds(duration) < 10 ? '0' + getDurationSeconds(duration) : getDurationSeconds(duration)}`
}
