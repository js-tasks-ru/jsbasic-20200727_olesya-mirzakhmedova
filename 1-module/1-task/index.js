/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
  let result = n;

  if (n === 0 || n === 1) {
    return 1;
  }

  for (let i = 0; i < n; i++) {
    result = result * (n - 1);
    n--;
  }

  return result;
}

