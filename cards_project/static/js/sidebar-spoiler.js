// Скрипт для создание эффекта появления/скрытия информации (спойлеры)

$(document).ready(function() {
    $('.first-level').click(function(event) {
        if($('.sidenav__link').hasClass('one')){
            $('.first-level').not($(this)).removeClass('active');
            $('.second-level').not($(this).next()).slideUp(300);
        }
        $(this).toggleClass('active').next().slideToggle(300);
    });
});