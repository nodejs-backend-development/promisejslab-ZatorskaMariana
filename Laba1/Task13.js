/**
 * Функція для отримання даних з API та виведення їх у потрібному форматі
 */
async function fetchTodos() {
  const url = 'https://gorest.co.in/public/v2/todos';

  try {
    // Виконуємо запит до API
    const response = await fetch(url);

    // Перевіряємо, чи запит успішний (статус 200-299)
    if (!response.ok) {
      throw new Error(`Помилка мережі: ${response.status}`);
    }

    // Парсимо JSON-відповідь
    const data = await response.json();

    // Перетворюємо масив об'єктів, залишаючи тільки потрібні поля
    // Примітка: у API поле називається 'due_on' (а не 'deu_on' як у завданні),
    // тому ми беремо значення саме з нього.
    const formattedData = data.map((item) => ({
      id: item.id,
      title: item.title,
      user_id: item.user_id,
      due_on: item.due_on,
    }));

    // Виводимо результат у консоль
    console.log(formattedData);
  } catch (error) {
    // Обробка можливих помилок
    console.error('Сталася помилка при отриманні даних:', error.message);
  }
}

// Виклик функції
fetchTodos();
