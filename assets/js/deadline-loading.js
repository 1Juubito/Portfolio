
var $ = jQuery;
var animationTime = 17,
    days = 7;
 
$(document).ready(function(){
    $('#progress-time-fill, #death-group, .mask-red').css({'animation-duration': animationTime+'s'});

    var deadlineAnimation = function () {
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

    var deadlineText = function () {
        var $el = $('.deadline-days');
        var html = '<div class="mask-red"><div class="inner">' + $el.html() + '</div></div><div class="mask-white"><div class="inner">' + $el.html() + '</div></div>';
        $el.html(html);
        $('.mask-red').css({'animation-duration': animationTime+'s', 'animation-timing-function': 'linear'});
    }

    deadlineText();
    deadlineAnimation(); 
});