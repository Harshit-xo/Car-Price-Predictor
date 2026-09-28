const companySelect = document.getElementById('company');
const modelSelect = document.getElementById('car_models');

// Fill the model dropdown with only the selected company's models
companySelect.addEventListener('change', function () {
  const models = companyModels[this.value] || [];
  modelSelect.innerHTML = '<option value="" disabled selected>Select Model</option>';
  models.forEach(function (m) {
    const opt = document.createElement('option');
    opt.value = m;
    opt.textContent = m;
    modelSelect.appendChild(opt);
  });
  modelSelect.disabled = false;
});

// Send the form to /predict and show the price
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