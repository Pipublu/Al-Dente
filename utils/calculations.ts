export function minutesToSeconds(mins: number) {
  return mins * 60;
}

export function calculatePages(numbItems: number, pageSize: number) {
  return Math.ceil(numbItems / pageSize);
}

export function secondsToHMS(time: number) {
  const hours = Math.floor(time / 60**2);
  const minutes = Math.floor(time / 60) % 60;
  const seconds = (time - hours * (60**2) - minutes * 60);
  return {
    h: hours,
    min: minutes,
    sec: seconds
  }
}