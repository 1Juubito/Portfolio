// Init
var $ = jQuery;
var animationTime = 17,
    days = 7;
 
$(document).ready(function(){

    // Aplica a duração da animação para o progresso, o ceifeiro E A MÁSCARA DE TEXTO
    $('#progress-time-fill, #death-group, .mask-red').css({'animation-duration': animationTime+'s'});

    var deadlineAnimation = function () {
        // Esta função de acelerar o designer pode permanecer a mesma
        setTimeout(function(){
            $('#designer-arm-grop').css({'animation-duration': '1.5s'});
        },0);
        setTimeout(function(){
            $('#designer-arm-grop').css({'animation-duration': '1s'});
        },4000);
        setTimeout(function(){
            $('#designer-arm-grop').css({'animation-duration': '0.7s'});
        },8000);
        setTimeout(function(){
            $('#designer-arm-grop').css({'animation-duration': '0.3s'});
        },12000);
        setTimeout(function(){
            $('#designer-arm-grop').css({'animation-duration': '0.2s'});
        },15000);
    };

    // Esta função cria a máscara de texto para a animação de preenchimento
    var deadlineText = function () {
        var $el = $('.deadline-days');
        var html = '<div class="mask-red"><div class="inner">' + $el.html() + '</div></div><div class="mask-white"><div class="inner">' + $el.html() + '</div></div>';
        $el.html(html);
        // Reaplica a duração da animação após a recriação do elemento
        $('.mask-red').css({'animation-duration': animationTime+'s', 'animation-timing-function': 'linear'});
    }

    // --- EXECUÇÃO ---

    deadlineText(); // Cria a estrutura para a animação do texto
    deadlineAnimation(); // Inicia a animação do designer


});