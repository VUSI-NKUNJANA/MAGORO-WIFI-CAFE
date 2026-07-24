const form = document.getElementById('appointmentForm');
const note = document.getElementById('formNote');
const year = document.getElementById('year');
const whatsappNumber = '27726170076';
const emailAddress = 'magorowifi@gmail.com';

if (year) {
  year.textContent = new Date().getFullYear();
}

if (form && note) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = form.name.value.trim();
    const contact = form.contact.value.trim();
    const date = form.date.value;
    const service = form.service.value;
    const action = event.submitter ? event.submitter.value : 'whatsapp';

    if (!name || !contact || !date) {
      note.textContent = 'Please fill in your name, contact, and preferred date before sending.';
      note.classList.remove('success');
      note.classList.add('error');
      return;
    }

    const messageText = `Booking request from ${name}\nContact: ${contact}\nPreferred date: ${date}\nService: ${service}\n\nPlease confirm.`;

    if (action === 'email') {
      const subject = encodeURIComponent('Magoro Wifi Cafe Booking Request');
      const body = encodeURIComponent(messageText);
      const mailtoUrl = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
      note.textContent = 'Opening your email app so you can send the booking request.';
      note.classList.remove('error');
      note.classList.add('success');
      window.location.href = mailtoUrl;
    } else {
      const waMessage = encodeURIComponent(messageText);
      const url = `https://wa.me/${whatsappNumber}?text=${waMessage}`;
      note.textContent = 'Opening WhatsApp so you can send your booking request.';
      note.classList.remove('error');
      note.classList.add('success');
      window.open(url, '_blank');
    }

    form.reset();
  });
}
