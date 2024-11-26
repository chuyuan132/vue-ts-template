/**
 * @description 过滤假值
 * @param {object} obj - 待清理的对象
 * @returns {object} 清理后的对象
 */
export function cleanObject(obj: Record<string, any>) {
  const currObj = { ...(obj || {}) };
  Object.keys(currObj).forEach(key => {
    const value = currObj[key];
    if (!value && value !== 0) {
      delete currObj[key];
    }
  });
  return currObj;
}
