
// Sticker menu
var headerBar = $('.menu-fixed'),
    isMobile = false,
    browserWidth = $(window).width(),
    sizeScroll = 0,
    headerFixedClass = 'menu-fixed-after';

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || browserWidth < 768) {
    isMobile = true;
    sizeScroll = 450;
} else {
    isMobile = false;
    sizeScroll = 730;
}

$(window).scroll(function () {
    // Menu fixed
    if ($(this).scrollTop() > sizeScroll) {
        headerBar.addClass(headerFixedClass);
    } else {
        headerBar.removeClass(headerFixedClass);
    }

    // Animate on scroll
    // Timeline
    $('.btn-year').each(function(){
        var imagePos = $(this).offset().top;

        var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+500) {
                $(this).addClass("slideUp");
            }
    });
});

// Magnific Popup
$('.unisul-pop-img').magnificPopup({
    type:'image'
});

// ScrollIt
$.scrollIt({
  scrollTime: 600,
  activeClass: 'active',
  topOffset: 0
});