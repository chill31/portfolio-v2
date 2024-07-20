const theme = localStorage.getItem('theme') ?? 'green';
if (localStorage.getItem('theme') === null) {
  localStorage.setItem('theme', 'green');
}
document.body.style.setProperty('--accent', `var(--accent-${theme}`);
document.querySelector(`.switch-${theme}`).classList.add('active');

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
const actualDesignationContent = 'web developer'.toUpperCase().split('');

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

const projectsSection = document.querySelector('.showcase');
const aboutMeSection = document.querySelector('.about-me');
const footer = document.querySelector('footer');

const menuLinks = document.querySelectorAll('.menu-link');
menuLinks.forEach((link) => {
  link.addEventListener('click', () => {
    document.body.classList.toggle('menu-open');
    disableMenuFocus();
  });
});

const menuButton = document.querySelector('.menu-button');
menuButton.addEventListener('click', () => {
  document.body.classList.toggle('menu-open');
  if (document.body.classList.contains('menu-open')) {
    menuLinks.forEach((link, index) => {
      enableMenuFocus();
      setTimeout(() => {
        link.classList.add('visible-animate');
      }, (index * 100) + 400);
    });
  } else {
    menuLinks.forEach((link) => {
      disableMenuFocus();
      link.classList.remove('visible-animate');
    });
  }
});

const projectLinkButtons = document.querySelectorAll('.project-link-button');
projectLinkButtons.forEach((button) => {
  button.addEventListener('click', () => {
    window.location.href = `https://${button.getAttribute('data-link')}.vercel.app`
  });
});

/** PROJECT CARDS OBSERVER */

const projectCards = document.querySelectorAll('.project > *');
const projectCardsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible-animate');
    }
  });
}, {
  threshold: window.innerWidth <= 840 ? 0.25 : 0.5
});

projectCards.forEach((card) => projectCardsObserver.observe(card));

const viewAllButton = document.querySelector('section.showcase button.github');
viewAllButton.addEventListener('click', () => {
  window.location.href = 'https://github.com/chill31?tab=repositories'
});

const menuGithubIcon = document.querySelector('.github-icon');
menuGithubIcon.addEventListener('click', () => {
  window.location.href = 'https://github.com/chill31'
});

const accentSwitcherSpans = document.querySelectorAll('.accent-switch');
accentSwitcherSpans.forEach((span) => {
  span.addEventListener('click', () => {

    accentSwitcherSpans.forEach((span) => {
      span.classList.remove('active');
    });

    const spanTheme = span.classList[1].replace('switch-', '');
    localStorage.setItem('theme', spanTheme);
    document.body.style.setProperty('--accent', `var(--accent-${spanTheme}`);
    span.classList.add('active');

  });
});

function enableMenuFocus() {
  const focusable = document.querySelectorAll('button:not(.menu-button), a:not(.nav-logo)');
  focusable.forEach((element) => {
    element.setAttribute('tabindex', '-1');
  });

  menuLinks.forEach((link) => {
    link.setAttribute('tabindex', '0');
  });
}

function disableMenuFocus() {
  const focusable = document.querySelectorAll('button, a');
  focusable.forEach((element) => {
    element.removeAttribute('tabindex');
  });

  menuLinks.forEach((link) => {
    link.setAttribute('tabindex', '-1');
  });
}