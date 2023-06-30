// Скрипт для создание эффекта появления/скрытия информации (спойлеры)

$(document).ready(function() {
    $('.spoiler-arrow__title').click(function(event) {
        if($('.spoiler-arrow').hasClass('one')){
            $('.spoiler-arrow__title').not($(this)).removeClass('active');
            $('.spoiler-arrow__block').not($(this).next()).slideUp(300);
        }
        $(this).toggleClass('active').next().slideToggle(300);
    });
});