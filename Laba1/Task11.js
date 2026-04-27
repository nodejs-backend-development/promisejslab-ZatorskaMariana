// ==================== ЗАВДАННЯ 10.1 ====================
/**
 * Створіть функцію, яка повертає найшвидшу відповідь
 *
 * @param {number[]} delays - Масив затримок в мілісекундах
 * @returns {Promise<number>} - Найменша затримка
 */
function getFastestResponse(delays) {
  // TODO: Створіть масив промісів з різними затримками
  // Кожен проміс резолвиться зі своєю затримкою
  const promises = delays.map(
    (delay) =>
      new Promise((resolve) => setTimeout(() => resolve(delay), delay)),
  );

  // Використайте Promise.race() щоб отримати найшвидшу відповідь
  return Promise.race(promises);
}

// Перевірка:
getFastestResponse([1000, 500, 2000, 300]).then((result) =>
  console.log(' Тест 10.1:', result),
); // 300
