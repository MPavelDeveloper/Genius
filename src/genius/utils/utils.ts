export function deepClone(obj: any): any {
  return JSON.parse(JSON.stringify(obj));
}

export function generateTokenForLocalStorage() {
  return `Bearer ${Date.now()}`;
}

export function random(max: number, min: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
