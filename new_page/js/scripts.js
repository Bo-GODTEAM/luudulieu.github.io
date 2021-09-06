$(document).ready(function () {
    $(document).on('click', '.arrow-up', function(e){
            e.preventDefault();
            $('html, body').stop().animate({scrollTop : 0}, 500); 
    });
    $(document).on('click', '.cp-info.settings .cp-choose a', function(e){
            e.preventDefault();
            $('.cp-info.settings .cp-choose a').removeClass('active');
            $(this).addClass('active');
            var whatTab = $(this).attr('data-tab');
            $('.cp-info form').removeClass('active');
            $('#'+whatTab).addClass('active');
    });
    $(document).on('click', '.cp-info.history .cp-choose a', function(e){
            e.preventDefault();
            $('.cp-info.history .cp-choose a').removeClass('active');
            $(this).addClass('active');
            var whatTab = $(this).attr('data-tab');
            $('.h-table').removeClass('active');
            $('#'+whatTab).addClass('active');
    });
    $(document).on('click', '.arrow-next', function(e){
            e.preventDefault();
            $('.slide:first-child').addClass('blur');
            setTimeout( function() {
                $('.slide:first-child').appendTo('.slider-wrapper');
                $('.slide').removeClass('blur');
            }, 300);
    });
    
    $(document).on('click', '.licenc .btn', function(e){
            e.preventDefault();
            $('.overlay, .popup-window, .popup#licenc').fadeIn(200);
    });
    $(document).on('click', '.gunskill .btn', function(e){
            e.preventDefault();
            $('.overlay, .popup-window, .popup#gunskill').fadeIn(200);
    });
    $(document).on('click', '.overlay', function(e){
            e.preventDefault();
            $('.overlay, .popup-window, .popup').fadeOut(200);
    });
    $(document).on('click', '.arrow-prev', function(e){
            e.preventDefault();
            $('.slide:first-child').addClass('blur');
            setTimeout( function() {
                $('.slide:last-child').prependTo('.slider-wrapper');
                $('.slide').removeClass('blur');
            }, 300);
    });

    $('.about .video.stop').on('click', function(e) {
        e.preventDefault();
        $(".about .video.stop iframe")[0].src += "?autoplay=1";
        $(this).removeClass('stop').addClass('play');
    });
});


    

