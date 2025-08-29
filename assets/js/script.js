'use strict';

// SCRIPT PARA ANIMAÇÃO DO LINK SUBLINHADO


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



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
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

// add event in all filter button items for large screen
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

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
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

// ... (código de título da aba)
document.addEventListener("visibilitychange", (event) => {
    if (document.visibilityState === "visible") {
        document.title = "Seja bem vindo 😀";
    } else {
        document.title = "Hey, volte aqui ☹️";
    }
});

// ... (código de limpar formulário)
window.addEventListener('load', function() {
    const form = document.querySelector('[data-form]');
    if (form) {
      form.reset();
    }
});

// Roda a função de redimensionamento uma vez quando a página carrega
document.addEventListener('DOMContentLoaded', resizeAnimatedLinks);


// ===== FORMULÁRIO E POPUP =====

document.addEventListener('DOMContentLoaded', function () {
    // Seletores dos Elementos
    const form = document.getElementById('form-contato');
    const loadingAnimation = document.getElementById('deadline');
    const loadingOverlay = document.getElementById('loading-overlay');
    const successPopup = document.getElementById('success-popup');
    const closePopupBtn = document.getElementById('popup-close-btn');

    // Função para mostrar o popup
    function showSuccessPopup() {
        if (successPopup) {
            successPopup.classList.add('active');
        }
    }

    // Função para esconder o popup
    function hideSuccessPopup() {
        if (successPopup) {
            successPopup.classList.remove('active');
        }
    }

    // Lógica de Envio do Formulário
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault(); 

            // Mostra o loading
            if (loadingOverlay) loadingOverlay.style.display = 'block';
            if (loadingAnimation) loadingAnimation.style.display = 'block';
            
            // Espera os 17 segundos da animação
            setTimeout(() => {
                // Esconde o loading
                if (loadingOverlay) loadingOverlay.style.display = 'none';
                if (loadingAnimation) loadingAnimation.style.display = 'none';
                
                // Mostra o popup de sucesso
                showSuccessPopup();
                
                // Envia o formulário para o Formspree em segundo plano
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

                form.reset(); // Limpa os campos
                
                const formBtn = document.querySelector("[data-form-btn]");
                formBtn.setAttribute("disabled", "");

            }, 17000); // 17 segundos, como você definiu!
        });
    }

    // Listeners para fechar o popup
    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', hideSuccessPopup);
    }
    if (successPopup) {
        // Fecha também se clicar no fundo (overlay)
        successPopup.addEventListener('click', function(e) {
            if (e.target === successPopup) {
                hideSuccessPopup();
            }
        });
    }
});

// =============================================================
// ===== LÓGICA PARA O MODAL DE PROJETOS =======================
// =============================================================

const projectItems = document.querySelectorAll("[data-project-item]");
const projectModalContainer = document.querySelector("[data-project-modal-container]");
const projectModalCloseBtn = document.querySelector("[data-project-modal-close-btn]");
const projectOverlay = document.querySelector("[data-project-overlay]");

// Variáveis do modal
const projectModalImg = document.querySelector("[data-project-modal-img]");
const projectModalTitle = document.querySelector("[data-project-modal-title]");
const projectModalText = document.querySelector("[data-project-modal-text]");
const projectModalLinkRepo = document.querySelector("[data-project-modal-link-repo]");
const projectModalLinkDemo = document.querySelector("[data-project-modal-link-demo]");

// Função para abrir/fechar o modal
const projectModalFunc = function () {
  projectModalContainer.classList.toggle("active");
  projectOverlay.classList.toggle("active");
}

// Adiciona evento de clique a todos os itens de projeto
for (let i = 0; i < projectItems.length; i++) {
  projectItems[i].addEventListener("click", function () {
    
    // Pega os dados do projeto clicado usando os atributos 'data-*'
    const title = this.dataset.title;
    const imgSrc = this.dataset.img;
    const description = this.dataset.description;
    const tech = this.dataset.tech;
    const learnings = this.dataset.learnings;
    const repoLink = this.dataset.repoLink;
    const demoLink = this.dataset.demoLink;

    // Popula o modal com as informações
    projectModalTitle.innerHTML = title;
    projectModalImg.src = imgSrc;
    projectModalImg.alt = title;
    
    // Constrói o HTML interno para a descrição
    const techListItems = tech.split(',').map(t => `<li>${t.trim()}</li>`).join('');
    projectModalText.innerHTML = `
      <p>${description}</p>
      <h5>Tecnologias Usadas:</h5>
      <ul class="tech-list">${techListItems}</ul>
      <h5>Aprendizados:</h5>
      <p>${learnings}</p>
    `;
    
    // Popula os links
    projectModalLinkRepo.href = repoLink;

    // Mostra ou esconde o botão de "Ver Online"
    if (demoLink) {
      projectModalLinkDemo.href = demoLink;
      projectModalLinkDemo.style.display = 'flex';
    } else {
      projectModalLinkDemo.style.display = 'none';
    }

    projectModalFunc();
  });
}

// Adiciona evento de clique para fechar o modal
projectModalCloseBtn.addEventListener("click", projectModalFunc);
projectOverlay.addEventListener("click", projectModalFunc);


// ===== VALIDAÇÃO DE FORMULÁRIO COM ANIMAÇÃO DE LABEL

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
        const errorMessage = input.parentElement.querySelector('.error-message');
        const parentGroup = input.parentElement;
        const isValid = validator();

        // Lógica da animação do Label
        if (input.value.trim() !== '') {
            parentGroup.classList.add('has-value');
        } else {
            parentGroup.classList.remove('has-value');
        }

        // Lógica da mensagem de erro
        if (input.value.trim() === '' || isValid) {
            errorMessage.textContent = '';
            input.classList.remove('invalid');
        } else {
            errorMessage.textContent = message;
            input.classList.add('invalid');
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

    // Adiciona os "ouvintes" a cada campo individualmente
    fullNameInput.addEventListener('input', () => {
        handleValidation(fullNameInput, validators.fullName, 'O nome deve ter pelo menos 3 caracteres.');
    });

    emailInput.addEventListener('input', () => {
        handleValidation(emailInput, validators.email, 'Por favor, insira um email válido.');
    });

    messageInput.addEventListener('input', () => {
        handleValidation(messageInput, validators.message, 'A mensagem deve ter pelo menos 10 caracteres.');
    });

    // Garante que o botão comece desabilitado
    submitBtn.setAttribute("disabled", "");
});