
// ============ JAVASCRIPT DO J.A.R.V.I.S. MODAL ========== //

// --- Seletores para os elementos do HTML ---
const btn = document.getElementById('jarvis-btn');
const content = document.getElementById('jarvis-content');
const modal = document.getElementById('jarvis-modal');
const closeBtn = document.querySelector('.jarvis-close-btn');

// --- Função para o assistente falar ---
function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    text_speak.lang = 'pt-BR';
    window.speechSynthesis.speak(text_speak);
}

// --- Função de saudação baseada na hora ---
function wishMe() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
        speak("Bom dia, Mestre.");
    } else if (hour >= 12 && hour < 18) {
        speak("Boa tarde, Mestre.");
    } else {
        speak("Boa noite, Senhor.");
    }
}

// --- Configuração do Reconhecimento de Voz ---
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'pt-BR';

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

// --- Lógica para controlar a Modal ---

// Evento para ABRIR a modal e começar a ouvir
btn.addEventListener('click', () => {
    modal.classList.add('active');
    content.textContent = "Estou ouvindo...";
    speak("Pois não?");
    // Pequeno delay para a fala de "Pois não?" não ser capturada pelo microfone
    setTimeout(() => {
        recognition.start();
    }, 1200);
});

// Evento para FECHAR a modal no botão 'X'
closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});

// Evento para FECHAR a modal clicando no fundo escuro
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.classList.remove('active');
    }
});


// --- Função Principal de Comandos ---
function takeCommand(message) {
    if (message.includes('oi') || message.includes('olá')) {
        speak("Olá Senhor, como posso ajudar?");
    } else if (message.includes("abrir o google")) {
        window.open("https://google.com", "_blank");
        speak("Abrindo o Google...");
    } else if (message.includes("abrir o youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Abrindo o YouTube...");
    } else if (message.includes("abrir o facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Abrindo o Facebook...");
    } else if (message.includes('o que é') || message.includes('quem é') || message.includes('o que são')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "Isto foi o que eu encontrei na internet sobre " + message;
        speak(finalText);
    } else if (message.includes('wikipédia')) {
        window.open(`https://pt.wikipedia.org/wiki/${message.replace("wikipédia", "").trim()}`, "_blank");
        const finalText = "Isto foi o que encontrei na Wikipédia sobre " + message;
        speak(finalText);
    } else if (message.includes('que horas são') || message.includes('horas')) {
        const time = new Date().toLocaleString('pt-BR', { hour: "numeric", minute: "numeric" });
        const finalText = "Agora são " + time;
        speak(finalText);
    } else if (message.includes('que dia é hoje') || message.includes('data')) {
        const date = new Date().toLocaleString('pt-BR', { month: "long", day: "numeric" });
        const finalText = "Hoje é dia " + date;
        speak(finalText);
    } else if (message.includes('calculadora')) {
        window.open('Calculator:///');
        const finalText = "Abrindo a Calculadora";
        speak(finalText);
    } else if (message.includes('fechar') || message.includes('pode ir')) {
        speak("Até mais, senhor.");
        modal.classList.remove('active');
    }
    else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "Encontrei algumas informações sobre " + message + " no Google";
        speak(finalText);
    }
}

// --- Saudação inicial ao carregar a página (opcional, pode ser removido se não quiser) ---
window.addEventListener('load', () => {
    // speak("Sistema online."); // Você pode ativar isso se quiser uma saudação ao carregar o site
    // wishMe();
});