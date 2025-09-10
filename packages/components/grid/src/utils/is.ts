const opt = Object.prototype.toString;

export function isObject(obj: unknown): obj is Record<string, any> {
  return opt.call(obj) === '[object Object]';
}

export function isNumber(obj: any): obj is number {
  return opt.call(obj) === '[object Number]' && obj === obj; // eslint-disable-line
}
