'use strict';

function resizeAnimatedLinks() {
  const visibleArticle = document.querySelector('article.active');
  if (!visibleArticle) return;

  const linksAnimados = visibleArticle.querySelectorAll('.link-animado');

  linksAnimados.forEach(link => {
    const textSpan = link.querySelector('.link-animado-texto');
    const svg = link.querySelector('svg');

    if (textSpan && svg) {
      const textWidth = textSpan.getBoundingClientRect().width;
      
      svg.style.setProperty('width', `${textWidth + 10}px`, 'important');

      const animationLength = textWidth * 2.5; 
      svg.style.setProperty('--hover-dasharray-length', `${animationLength}px`);
    }
  });
}

const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
}

modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

const filterItems = document.querySelectorAll("[data-filter-item]");
const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "todos") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

let lastClickedBtn = filterBtn[0];
for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        requestAnimationFrame(resizeAnimatedLinks);
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
      const ratingInputs = document.querySelectorAll('input[name="rating"]');
      const ratingMessage = document.getElementById('rating-message');
      const hasRated = localStorage.getItem('portfolioRated');
      if (hasRated) {
        ratingMessage.textContent = 'Obrigado por sua avaliação anterior!';
        ratingMessage.classList.add('success-message');
        ratingInputs.forEach(input => {
          input.disabled = true;
        });
        document.querySelectorAll('.rating-box label').forEach(label => {
          label.style.cursor = 'default';
          label.style.pointerEvents = 'none';
        });
      }
      ratingInputs.forEach(input => {
        input.addEventListener('change', async function() {
          const rating = this.value;
          try {
            const response = await fetch('https://formspree.io/f/xgvzjgzj', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ rating: rating, page: 'portfolio', _subject: `Nova avaliação: ${rating} estrelas` })
            });
            const result = await response.json();
            if (response.ok) {
              ratingMessage.textContent = 'Obrigado pela sua avaliação!';
              ratingMessage.classList.remove('error-message');
              ratingMessage.classList.add('success-message');
              localStorage.setItem('portfolioRated', 'true');
              ratingInputs.forEach(input => { input.disabled = true; });
              document.querySelectorAll('.rating-box label').forEach(label => {
                label.style.cursor = 'default';
                label.style.pointerEvents = 'none';
              });
            } else {
              ratingMessage.textContent = 'Erro ao enviar avaliação: ' + result.message;
              ratingMessage.classList.remove('error-message');
              ratingMessage.classList.add('error-message');
            }
          } catch (error) {
            console.error('Erro:', error);
            ratingMessage.textContent = 'Erro de conexão. Tente novamente.';
            ratingMessage.classList.remove('success-message');
            ratingMessage.classList.add('error-message');
          }
        });
      });
    });

document.addEventListener("visibilitychange", (event) => {
    if (document.visibilityState === "visible") {
        document.title = "Seja bem vindo 😀";
    } else {
        document.title = "Hey, volte aqui ☹️";
    }
});

window.addEventListener('load', function() {
    const form = document.querySelector('[data-form]');
    if (form) {
      form.reset();
    }
});

document.addEventListener('DOMContentLoaded', resizeAnimatedLinks);

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form-contato');
    const loadingAnimation = document.getElementById('deadline');
    const loadingOverlay = document.getElementById('loading-overlay');
    const successPopup = document.getElementById('success-popup');
    const closePopupBtn = document.getElementById('popup-close-btn');

    function showSuccessPopup() {
        if (successPopup) {
            successPopup.classList.add('active');
        }
    }

    function hideSuccessPopup() {
        if (successPopup) {
            successPopup.classList.remove('active');
        }
    }

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault(); 
            if (loadingOverlay) loadingOverlay.style.display = 'block';
            if (loadingAnimation) loadingAnimation.style.display = 'block';
            setTimeout(() => {
                if (loadingOverlay) loadingOverlay.style.display = 'none';
                if (loadingAnimation) loadingAnimation.style.display = 'none';
                showSuccessPopup();
                fetch(form.action, {
                    method: form.method,
                    body: new FormData(form),
                    headers: {
                        'Accept': 'application/json'
                    }
                }).then(response => {
                    if (response.ok) {
                        console.log('Formulário enviado com sucesso!');
                    } else {
                        console.error('Erro ao enviar o formulário.');
                    }
                }).catch(error => {
                    console.error('Erro de rede:', error);
                });
                form.reset();
                const formBtn = document.querySelector("[data-form-btn]");
                formBtn.setAttribute("disabled", "");

            }, 17000);
        });
    }

    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', hideSuccessPopup);
    }
    if (successPopup) {
        successPopup.addEventListener('click', function(e) {
            if (e.target === successPopup) {
                hideSuccessPopup();
            }
        });
    }
});

const projectItems = document.querySelectorAll("[data-project-item]");
const projectModalContainer = document.querySelector("[data-project-modal-container]");
const projectModalCloseBtn = document.querySelector("[data-project-modal-close-btn]");
const projectOverlay = document.querySelector("[data-project-overlay]");

const projectModalImg = document.querySelector("[data-project-modal-img]");
const projectModalTitle = document.querySelector("[data-project-modal-title]");
const projectModalText = document.querySelector("[data-project-modal-text]");
const projectModalLinkRepo = document.querySelector("[data-project-modal-link-repo]");
const projectModalLinkDemo = document.querySelector("[data-project-modal-link-demo]");

const projectModalFunc = function () {
  projectModalContainer.classList.toggle("active");
  projectOverlay.classList.toggle("active");
}

for (let i = 0; i < projectItems.length; i++) {
  projectItems[i].addEventListener("click", function () {
    
    const title = this.dataset.title;
    const imgSrc = this.dataset.img;
    const description = this.dataset.description;
    const tech = this.dataset.tech;
    const learnings = this.dataset.learnings;
    const repoLink = this.dataset.repoLink;
    const demoLink = this.dataset.demoLink;

    projectModalTitle.innerHTML = title;
    projectModalImg.src = imgSrc;
    projectModalImg.alt = title;
    
    const techListItems = tech.split(',').map(t => `<li>${t.trim()}</li>`).join('');
    projectModalText.innerHTML = `
      <p>${description}</p>
      <h5>Tecnologias Usadas:</h5>
      <ul class="tech-list">${techListItems}</ul>
      <h5>Aprendizados:</h5>
      <p>${learnings}</p>
    `;
    
    projectModalLinkRepo.href = repoLink;
    if (demoLink) {
      projectModalLinkDemo.href = demoLink;
      projectModalLinkDemo.style.display = 'flex';
    } else {
      projectModalLinkDemo.style.display = 'none';
    }

    projectModalFunc();
  });
}

projectModalCloseBtn.addEventListener("click", projectModalFunc);
projectOverlay.addEventListener("click", projectModalFunc);

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector("[data-form]");
    if (!contactForm) return;

    const fullNameInput = contactForm.querySelector("#fullname");
    const emailInput = contactForm.querySelector("#email");
    const messageInput = contactForm.querySelector("#message");
    const submitBtn = contactForm.querySelector("[data-form-btn]");

    const validators = {
        fullName: () => fullNameInput.value.trim().length >= 3,
        email: () => /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(emailInput.value),
        message: () => messageInput.value.trim().length >= 10
    };

    const handleValidation = (input, validator, message) => {
        const parentGroup = input.parentElement;
        const feedbackContainer = parentGroup.querySelector('.form-feedback');
        const errorMessage = feedbackContainer.querySelector('.error-message');
        const charCounter = feedbackContainer.querySelector('.char-counter');
        const isValid = validator();
        
        if (input.value.trim() !== '') {
            parentGroup.classList.add('has-value');
        } else {
            parentGroup.classList.remove('has-value');
        }

        if (input.value.trim() === '' || isValid) {
            errorMessage.textContent = '';
            input.classList.remove('invalid');
        } else {
            errorMessage.textContent = message;
            input.classList.add('invalid');
        }

        const maxLength = input.getAttribute('maxlength');
        const currentLength = input.value.length;

        if (maxLength) {
            if (currentLength >= maxLength) {
                charCounter.textContent = `Limite de ${maxLength} caracteres atingido.`;
                charCounter.classList.add('limit-reached');
            } else {
                charCounter.textContent = '';
                charCounter.classList.remove('limit-reached');
            }
        }
        
        updateSubmitButtonState();
    };
    
    const updateSubmitButtonState = () => {
        const isFormValid = validators.fullName() && validators.email() && validators.message();
        if (isFormValid) {
            submitBtn.removeAttribute("disabled");
        } else {
            submitBtn.setAttribute("disabled", "");
        }
    };

    fullNameInput.addEventListener('input', () => {
        handleValidation(fullNameInput, validators.fullName, 'O nome deve ter pelo menos 3 caracteres.');
    });

    emailInput.addEventListener('input', () => {
        handleValidation(emailInput, validators.email, 'Por favor, insira um email válido.');
    });

    messageInput.addEventListener('input', () => {
        handleValidation(messageInput, validators.message, 'A mensagem deve ter pelo menos 10 caracteres.');
    });

    submitBtn.setAttribute("disabled", "");
});