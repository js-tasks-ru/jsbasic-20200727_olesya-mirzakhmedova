/**
 * Складываем зарплаты
 * @param {Object} salaries - объект зарплат
 * @returns {Number}
 */
function sumSalary(salaries) {
  let result = 0;

  for (let key in salaries) {
    if (typeof(salaries[key]) === "number") {
      result = result + salaries[key];
    }
  }

  return result;
}
