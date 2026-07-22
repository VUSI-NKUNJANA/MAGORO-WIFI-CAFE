const form = document.getElementById('appointmentForm');
const note = document.getElementById('formNote');
const year = document.getElementById('year');

if (year) {
  year.textContent = new Date().getFullYear();
}

if (form && note) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    note.textContent = 'Thank you! We have received your appointment request.';
    form.reset();
  });
}
