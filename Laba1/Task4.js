// ==================== ЗАВДАННЯ 2.2 ====================
/**
 * Створіть функцію, яка приймає масив чисел
 * і повертає проміс з сумою цих чисел
 *
 * @param {number[]} numbers
 * @returns {Promise<number>}
 */
function sumNumbers(numbers) {
  // TODO: Порахуйте суму та поверніть її через Promise.resolve()
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return Promise.resolve(sum);
}

// Перевірка:
sumNumbers([1, 2, 3, 4, 5]).then((sum) => console.log(' Тест 2.2:', sum)); // Очікується: 15
