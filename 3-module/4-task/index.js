/**
 * showSalary
 * @param {Array} users - данные о пользователях
 * @param {number} age - максимальный возраст
 * @returns {string}
 */
function showSalary(users, age) {
  let resultString = '';
  users.map((user, index) => {
    if (user.age <= age) {
      if (index !== 0) {
        resultString += '\n';
      }
      resultString += `${user.name}, ${user.balance}`;
    }
  });

  return resultString;
}
