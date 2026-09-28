    document.getElementById('predict-form').addEventListener('submit', async function (e) {
      e.preventDefault();
      const result = document.getElementById('result');
      result.style.color = '#555';
      result.textContent = 'Predicting...';
      try {
        const response = await fetch('/predict', { method: 'POST', body: new FormData(this) });
        if (!response.ok) throw new Error('Server error');
        const price = await response.text();
        result.style.color = '#16a34a';
        result.textContent = 'Predicted Price: ₹ ' + price;
      } catch (err) {
        result.style.color = '#dc2626';
        result.textContent = 'Something went wrong. Check the terminal for the error.';
      }
    });