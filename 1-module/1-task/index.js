/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
  let result = n;
  let count = n - 1;

  if (n === 0 || n === 1) {
    return 1;
  }

  for (let i = 0; i < n - 1; i++) {
    result = result * count;
    count--;
  }

  return result;
}
