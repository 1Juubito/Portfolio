'use strict';



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

    if (selectedValue === "all") {
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

    // check form validation
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
      
      // Verificar se já avaliou anteriormente
      const hasRated = localStorage.getItem('portfolioRated');
      if (hasRated) {
        ratingMessage.textContent = 'Obrigado por sua avaliação anterior!';
        ratingMessage.classList.add('success-message');
        // Desabilitar novas avaliações se já tiver avaliado
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
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ 
                rating: rating,
                page: 'portfolio',
                _subject: `Nova avaliação: ${rating} estrelas`
              })
            });
            
            const result = await response.json();
            
            if (response.ok) {
              ratingMessage.textContent = 'Obrigado pela sua avaliação!';
              ratingMessage.classList.remove('error-message');
              ratingMessage.classList.add('success-message');
              
              // Salvar no localStorage para evitar múltiplas avaliações
              localStorage.setItem('portfolioRated', 'true');
              
              // Desabilitar novas avaliações
              ratingInputs.forEach(input => {
                input.disabled = true;
              });
              document.querySelectorAll('.rating-box label').forEach(label => {
                label.style.cursor = 'default';
                label.style.pointerEvents = 'none';
              });
            } else {
              ratingMessage.textContent = 'Erro ao enviar avaliação: ' + result.message;
              ratingMessage.classList.remove('success-message');
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
    // Seleciona o formulário pelo atributo 'data-form'
    const form = document.querySelector('[data-form]');
    
    // Se o formulário for encontrado, limpa seus campos.
    if (form) {
      form.reset();
    }
});