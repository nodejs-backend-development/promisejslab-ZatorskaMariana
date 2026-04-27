
// ==================== ЗАВДАННЯ 10.6 ====================
/**
 * Створіть функцію для конкуруючих обчислень
 * Запустіть кілька воркерів паралельно і поверніть результат першого
 */

function worker(workerId, complexity) {
    return new Promise(resolve => {
        const startTime = Date.now();
        setTimeout(() => {
            resolve({
                workerId,
                result: `Worker ${workerId} completed`,
                timeTaken: Date.now() - startTime
            });
        }, complexity * Math.random() * 100);
    });
}

/**
 * Запустіть 5 воркерів паралельно і поверніть результат найшвидшого
 * Воркери мають складність 1, 2, 3, 4, 5
 * 
 * @returns {Promise<{workerId: number, result: string, timeTaken: number}>}
 */
function parallelComputation() {
    // TODO: Створіть 5 воркерів і використайте Promise.race()
    const workers = [];
    
    // Створюємо 5 воркерів: ID від 1 до 5, складність від 1 до 5
    for (let i = 1; i <= 5; i++) {
        workers.push(worker(i, i));
    }

    // Повертаємо результат першого, хто виконається
    return Promise.race(workers);
}

// Перевірка:
parallelComputation()
    .then(result => console.log(' Тест 10.6:', result));
