// ==================== ЗАВДАННЯ 21.6 ====================
/**
 * Створіть чергу з callback'ами для моніторингу
 */
class MonitoredQueue {
  constructor(options = {}) {
    this.queue = [];
    this.processing = false;
    this.onStart = options.onStart || (() => {});
    this.onComplete = options.onComplete || (() => {});
    this.onError = options.onError || (() => {});
    this.stats = {
      total: 0,
      completed: 0,
      failed: 0,
    };
  }

  add(promiseFactory) {
    // TODO: Додайте з моніторингом
    this.queue.push(promiseFactory);
    this.stats.total++;

    if (!this.processing) {
      this.process();
    }
  }

  async process() {
    // TODO: Обробіть з викликом callback'ів
    // onStart перед кожним завданням
    // onComplete після успішного виконання
    // onError при помилці
    this.processing = true;

    while (this.queue.length > 0) {
      const task = this.queue.shift();

      // Розраховуємо індекс завдання: загальна кількість мінус те, що ще залишилося в черзі (після видалення поточного)
      const currentIndex = this.stats.total - this.queue.length - 1;

      try {
        this.onStart(currentIndex);
        const result = await task();

        this.stats.completed++;
        this.onComplete(currentIndex, result);
      } catch (error) {
        this.stats.failed++;
        this.onError(currentIndex, error);
      }
    }

    this.processing = false;
  }

  getStats() {
    return this.stats;
  }
}

// Перевірка:
const queue6 = new MonitoredQueue({
  onStart: (index) => console.log(`  Starting task ${index + 1}`),
  onComplete: (index, result) => console.log(`  Task ${index + 1} completed`),
  onError: (index, error) =>
    console.log(`  Task ${index + 1} failed:`, error.message),
});

queue6.add(() => Promise.resolve('OK'));
queue6.add(() => Promise.reject(new Error('Fail')));
queue6.add(() => Promise.resolve('OK'));

console.log('Тест 21.6: Черга з моніторингом');
