// ==================== ЗАВДАННЯ 21.7 ====================
/**
 * Створіть універсальну чергу з усіма можливостями
 */
class UniversalQueue {
  constructor(options = {}) {
    this.queue = [];
    this.processing = false;
    this.paused = false;

    // Опції
    this.concurrency = options.concurrency || 1; // Скільки завдань одночасно
    this.timeout = options.timeout || null;
    this.maxRetries = options.maxRetries || 0;
    this.autoStart = options.autoStart !== false;

    // Callback'и
    this.onStart = options.onStart || (() => {});
    this.onComplete = options.onComplete || (() => {});
    this.onError = options.onError || (() => {});
    this.onDrain = options.onDrain || (() => {}); // Коли черга порожня

    // Статистика
    this.stats = {
      total: 0,
      completed: 0,
      failed: 0,
      running: 0,
    };
  }

  add(promiseFactory, priority = 0) {
    // TODO: Реалізуйте повну функціональність
    const task = {
      factory: promiseFactory,
      retries: 0,
      priority: priority,
    };

    // Сортуємо за пріоритетом (чим більше число, тим вищий пріоритет)
    let added = false;
    for (let i = 0; i < this.queue.length; i++) {
      if (priority > this.queue[i].priority) {
        this.queue.splice(i, 0, task);
        added = true;
        break;
      }
    }
    if (!added) {
      this.queue.push(task);
    }

    this.stats.total++;

    if (this.autoStart && !this.paused) {
      this.process();
    }
  }

  pause() {
    this.paused = true;
  }

  resume() {
    this.paused = false;
    this.process();
  }

  clear() {
    this.queue = [];
  }

  async process() {
    // TODO: Обробка з урахуванням concurrency
    // Одночасно може виконуватися до this.concurrency завдань

    // Якщо черга на паузі або вона вже обробляється (хоча для concurrency ми перевіряємо running),
    // ми перевіряємо умови запуску нових задач
    if (this.paused) return;

    // Заповнюємо вільні слоти
    while (this.queue.length > 0 && this.stats.running < this.concurrency) {
      const task = this.queue.shift();
      this.stats.running++;

      this.onStart(task);

      // Запускаємо задачу асинхронно, не чекаючи завершення в циклі while,
      // щоб дозволити паралельне виконання
      this._runTask(task).finally(() => {
        this.stats.running--;

        // Якщо черга порожня і нічого не працює, викликаємо onDrain
        if (this.queue.length === 0 && this.stats.running === 0) {
          this.onDrain();
        } else {
          // Спробуємо запустити наступну задачу (рекурсивний виклик process для заповнення слотів)
          this.process();
        }
      });
    }
  }

  async _runTask(task) {
    try {
      let promise = task.factory();

      // Обробка тайм-ауту
      if (this.timeout) {
        promise = Promise.race([
          promise,
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), this.timeout),
          ),
        ]);
      }

      const result = await promise;
      this.stats.completed++;
      this.onComplete(task, result);
    } catch (error) {
      // Логіка повторних спроб (Retries)
      if (task.retries < this.maxRetries) {
        task.retries++;
        // Додаємо задачу назад на початок черги для швидкого повтору
        this.queue.unshift(task);
        console.warn(`Task retry ${task.retries}/${this.maxRetries}`);
      } else {
        this.stats.failed++;
        this.onError(task, error);
      }
    }
  }

  getStats() {
    return { ...this.stats };
  }
}

// Перевірка:
const queue7 = new UniversalQueue({
  concurrency: 2,
  timeout: 1000,
  maxRetries: 2,
  onStart: (task) =>
    console.log(`> Starting task (Priority: ${task.priority})`),
  onComplete: (task, result) => console.log(`< Completed: ${result}`),
  onError: (task, error) => console.log(`! Failed: ${error.message}`),
  onDrain: () => console.log('--- All tasks completed! ---'),
});

// Додаємо задачі з випадковою затримкою та різними пріоритетами
for (let i = 1; i <= 5; i++) {
  queue7.add(
    () =>
      new Promise((resolve) => {
        const delay = Math.random() * 500 + 500; // 500-1000ms
        setTimeout(() => resolve(`Task ${i}`), delay);
      }),
    i % 2 === 0 ? 10 : 1,
  ); // Парні мають високий пріоритет
}

console.log('Тест 21.7: Універсальна черга запущена');
