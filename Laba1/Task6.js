// ==================== ЗАВДАННЯ 2.6 ====================
/**
 * Створіть функцію, яка конвертує масив значень в масив промісів
 * Кожен проміс має резолвитися з відповідним значенням
 *
 * @param {any[]} values
 * @returns {Promise<any>[]}
 */
function valuesToPromises(values) {
  // TODO: Конвертуйте кожне значення в проміс
  return values.map((value) => Promise.resolve(value));
}

// Перевірка:
const promises = valuesToPromises([1, 2, 3]);
Promise.all(promises).then((results) => console.log(' Тест 2.6:', results));
// Очікується: [1, 2, 3]
