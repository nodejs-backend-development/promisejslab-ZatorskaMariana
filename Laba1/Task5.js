// ==================== ЗАВДАННЯ 2.3 ====================
/**
 * Створіть функцію, яка конвертує об'єкт користувача
 * додаючи йому поле fullName
 *
 * @param {{firstName: string, lastName: string}} user
 * @returns {Promise<{firstName: string, lastName: string, fullName: string}>}
 */
function addFullName(user) {
  // TODO: Додайте поле fullName і поверніть через проміс
  // fullName = firstName + ' ' + lastName
  const fullName = `${user.firstName} ${user.lastName}`;

  // Створюємо новий об'єкт, що включає всі старі поля та нове поле fullName
  const updatedUser = {
    ...user,
    fullName: fullName,
  };

  return Promise.resolve(updatedUser);
}

// Перевірка:
addFullName({ firstName: 'John', lastName: 'Doe' }).then((user) =>
  console.log(' Тест 2.3:', user),
);
// Очікується: { firstName: 'John', lastName: 'Doe', fullName: 'John Doe' }
