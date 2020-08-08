/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
  let numArray = str
    .split(',')
    .join(' ')
    .split(' ')
    .filter((item) => {
      if (!isNaN(item)){
        return item;
      }
    });

  return {
    min: Math.min.apply(null, numArray),
    max: Math.max.apply(null, numArray),
  }
}
