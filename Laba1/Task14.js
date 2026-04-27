// ==================== ЗАВДАННЯ 21.3 ====================
/**
 * Створіть чергу з можливістю паузи та відновлення
 */
class ControllableQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
    this.paused = false;
    this.unblock = null; // Функція для розблокування очікування
  }

  add(promiseFactory) {
    // TODO: Додайте в чергу
    this.queue.push(promiseFactory);
    // Якщо обробка зараз не йде, запускаємо її
    if (!this.processing) {
      this.process();
    }
  }

  pause() {
    // TODO: Призупиніть обробку
    this.paused = true;
  }

  resume() {
    // TODO: Відновіть обробку
    this.paused = false;
    // Якщо процес чекає на "розблокування", викликаємо його
    if (this.unblock) {
      this.unblock();
      this.unblock = null;
    }
  }

  async process() {
    // TODO: Обробляйте з урахуванням паузи
    this.processing = true;

    while (this.queue.length > 0) {
      // Перевіряємо this.paused перед кожним завданням
      if (this.paused) {
        // Створюємо проміс, який вирішується тільки при виклику resume()
        await new Promise((resolve) => {
          this.unblock = resolve;
        });
      }

      const task = this.queue.shift();
      await task();
    }

    this.processing = false;
  }
}

// Перевірка:
const queue3 = new ControllableQueue();

queue3.add(() => Promise.resolve(console.log('  Task A')));
queue3.add(() => Promise.resolve(console.log('  Task B')));

setTimeout(() => {
  queue3.pause();
  console.log('  Queue paused');
}, 100);

setTimeout(() => {
  queue3.add(() => Promise.resolve(console.log('  Task C')));
  queue3.resume();
  console.log('  Queue resumed');
}, 500);

console.log(' Тест 21.3: Контрольована черга');
