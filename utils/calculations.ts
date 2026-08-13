export function minutesToSeconds(mins: number) {
  return mins * 60;
}

export function calculatePages(numbItems: number, pageSize: number) {
  return Math.ceil(numbItems / pageSize);
}

export function secondsToHMS(time: number) {
  const hours = Math.floor(time / 60);
  const minutes = Math.floor(time);
  const seconds = (time - Math.floor(time)) * 60;
  return {
    h: hours,
    min: minutes,
    sec: seconds
  }
}