/**
 *
 * Should return a promise that resolves with the value after delayInMs
 *
 * @param {any} value
 * @param {number} delay
 * @return {Promise<any>} - A promise that will resolve with the value after delayInMs milliseconds
 */
function job(delay) {
  // put your code here
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(delay);
    }, delay);
  });
}

// Run 'job' function with delays 1000, 2000, 500, 1500 and
// use Promise.all to print `done ${delay}` in console when every task is done

// put your code here
const delays = [1000, 2000, 500, 1500];

// Створюємо масив промісів, запускаючи job для кожної затримки
const promises = delays.map((delay) => job(delay));

// Чекаємо, поки всі проміси виконаються
Promise.all(promises).then((results) => {
  // Коли всі виконані, виводимо повідомлення для кожного результату
  results.forEach((delay) => {
    console.log(`done ${delay}`);
  });
});
