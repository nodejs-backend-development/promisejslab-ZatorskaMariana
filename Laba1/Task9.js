// ==================== ЗАВДАННЯ 7.4 ====================
/**
 * Створіть ланцюжок з обробкою помилок
 * Якщо number < 0 - кинути помилку
 * Інакше виконати обчислення
 */

function validateNumber(number) {
  if (number < 0) {
    throw new Error('Number must be positive');
  }
  return number;
}

/**
 * Створіть функцію, яка:
 * 1. Валідує число (використовуйте validateNumber)
 * 2. Множить на 2
 * 3. Додає 5
 * 4. Повертає результат у форматі {original: number, result: number}
 * 5. Обробляє помилки та повертає {error: string}
 *
 * @param {number} number
 * @returns {Promise<{original?: number, result?: number, error?: string}>}
 */
function safeCalculation(number) {
  // TODO: Реалізуйте з обробкою помилок
  const originalNumber = number; // Зберігаємо початкове значення для фінального об'єкту

  return (
    Promise.resolve(number)
      // 1. Валідує число
      .then((num) => validateNumber(num))
      // 2. Множить на 2
      .then((num) => num * 2)
      // 3. Додає 5
      .then((num) => num + 5)
      // 4. Повертає результат у форматі об'єкта
      .then((result) => ({
        original: originalNumber,
        result: result,
      }))
      // 5. Обробляє помилки та повертає об'єкт з помилкою
      .catch((error) => ({
        error: error.message,
      }))
  );
}

// Перевірка:
safeCalculation(10).then((result) => console.log(' Тест 7.4a:', result));
// Очікується: { original: 10, result: 25 }

safeCalculation(-5).then((result) => console.log(' Тест 7.4b:', result));
// Очікується: { error: 'Number must be positive' }
