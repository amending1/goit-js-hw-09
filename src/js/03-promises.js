document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.form');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const delayInput = form.querySelector('[name="delay"]');
    const stepInput = form.querySelector('[name="step"]');
    const amountInput = form.querySelector('[name="amount"]');

    //przekształcenie wartości wprowadzonych przez użytkownika w polach formularza na liczby całkowite w systemie dziesiętnym
    const firstDelay = parseInt(delayInput.value, 10);
    const step = parseInt(stepInput.value, 10);
    const amount = parseInt(amountInput.value, 10);

    generatePromises(firstDelay, step, amount);
  });

  function generatePromises(firstDelay, step, amount) {
    for (let i = 1; i <= amount; i++) {
      const currentDelay = firstDelay + (i - 1) * step;
      createPromise(i, currentDelay) // (numer obietnicy, obliczone opóźnienie)
        .then(response => {
          console.log(
            `✅ Fulfilled promise ${response.position} in ${response.delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          //wewnątrz .catch jest dekonstrukcja obiektu response
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }
  }

  function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
        const response = {
          position,
          delay,
        };
        if (shouldResolve) {
          resolve(response);
        } else {
          reject(response);
        }
      }, delay);
    });
  }
});
