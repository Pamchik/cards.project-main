// Скрипт для создание эффекта появления/скрытия информации (спойлеры)

$(document).ready(function() {
    $('.spoiler-num-cycle__title').click(function(event) {
        if($('.spoiler-num-cycle').hasClass('one')){
            $('.spoiler-num-cycle__title').not($(this)).removeClass('active');
            $('.spoiler-num-cycle__block').not($(this).next()).slideUp(300);
        }
        $(this).toggleClass('active').next().slideToggle(300);
    });
});