export function minutesToSeconds(mins: number) {
  return mins * 60;
}

export function calculatePages(numbItems: number, pageSize: number) {
  return Math.ceil(numbItems / pageSize);
}