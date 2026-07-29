const form = document.getElementById('appointmentForm');
const note = document.getElementById('formNote');
const year = document.getElementById('year');
const whatsappNumber = '27726170076';
const emailAddress = 'magorowifi@gmail.com';

if (year) {
  year.textContent = new Date().getFullYear();
}

const revealElements = document.querySelectorAll(
  'header, main section, footer, .hero-card, .product-card, .appointment-form, .visit-card, .workflow-card, .team-card, .section-heading, .hero-actions, .hero-features, .nav-links, .nav-btn, .brand, .hero-content > div'
);

const applyRevealDirections = () => {
  const breakpoint = window.innerWidth * 0.6;

  revealElements.forEach((element) => {
    if (element.classList.contains('is-visible')) return;

    const rect = element.getBoundingClientRect();
    const elementCenter = rect.left + rect.width / 2;

    if (elementCenter > breakpoint) {
      element.classList.add('from-right');
    } else {
      element.classList.remove('from-right');
    }
  });
};

revealElements.forEach((element, index) => {
  element.classList.add('reveal');
  element.style.transitionDelay = `${Math.min(index * 80, 320)}ms`;
});

applyRevealDirections();
window.addEventListener('resize', applyRevealDirections);

const revealOnScroll = () => {
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

  revealElements.forEach((element) => {
    if (element.classList.contains('is-visible')) return;

    const rect = element.getBoundingClientRect();

    if (rect.top < viewportHeight * 0.9) {
      element.classList.add('is-visible');
    }
  });
};

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -10% 0px' }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealOnScroll();
}

window.addEventListener('scroll', revealOnScroll, { passive: true });
window.addEventListener('load', revealOnScroll);

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
