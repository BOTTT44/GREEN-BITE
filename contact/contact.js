const form = document.getElementById('feedbackForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('Email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const interest = document.getElementById('interest').value;
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !interest || !message) {
    alert("Please fill in all required fields.");
    return;
  }

  const feedback = { name, email, phone, interest, message, date: new Date().toISOString() };
  let stored = JSON.parse(localStorage.getItem('feedbacks') || "[]");
  stored.push(feedback);
  localStorage.setItem('feedbacks', JSON.stringify(stored));

  alert("Thank you! Your feedback has been submitted.");
  form.reset();
});
