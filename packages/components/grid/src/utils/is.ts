const opt = Object.prototype.toString

/** 是否为普通对象（排除数组、null 等） */
export function isObject(obj: unknown): obj is Record<string, any> {
  return opt.call(obj) === '[object Object]'
}
