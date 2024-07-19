const mainTitle = document.querySelector('h1.name');
const designation = document.querySelector('.designation');
const designationSpans = document.querySelectorAll('.designation .letter');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible-animate');
      if (entry.target.classList.contains('designation') && !entry.target.classList.contains('animated')) {
        animateDesignation();
        entry.target.classList.add('animated');
      }
    }
  });
});

observer.observe(designation);
observer.observe(mainTitle);

const randomChars = ["#", "$", "%", "&", "*", "+", "-", "!", "@", "?"];
const actualDesignationContent = ['W', 'E', 'B', ' ', 'D', 'E', 'V', 'E', 'L', 'O', 'P', 'E', 'R'];

function animateDesignation() {
  designationSpans.forEach((span) => {
    span.textContent = randomChars[Math.floor(Math.random() * randomChars.length)];
  });

  let randomInterval = setInterval(() => {
    designationSpans.forEach((span) => {
      if (!span.classList.contains('actual-content')) {
        span.textContent = randomChars[Math.floor(Math.random() * randomChars.length)];
      }
    });
  }, 45);

  actualDesignationContent.forEach((char, index) => {
    setTimeout(() => {
      designationSpans[index].textContent = char;
      designationSpans[index].classList.add('actual-content');
    }, index * 100);
  });

  setTimeout(() => {
    clearInterval(randomInterval);
  }, actualDesignationContent.length * 100);
}

const scrollIndicator = document.querySelector('.scroll-indicator');
const secondSection = document.querySelector('section.hero + section')
scrollIndicator.addEventListener('click', () => {
  window.scrollTo({
    top: secondSection.offsetTop,
    behavior: 'smooth'
  });
});