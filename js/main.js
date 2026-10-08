(function($) {
    "use strict";

    //10. preloader
    $(window).on('load', function() {
        $('.preloader-wave-effect').fadeOut();
        $('#preloader-wrapper').delay(150).fadeOut('slow');
    });

    // slider owlCarousel
    $('.slider-active').owlCarousel({
        loop: true,
        margin: 30,
        autoplay: true,
        autoplayTimeout: 5000,
        nav: false,
        smartSpeed: 1500,
        mouseDrag: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });

    // testimonial-active owlCarousel
    $('.testimonial-active').owlCarousel({
        loop: true,
        margin: 30,
        autoplay: true,
        autoplayTimeout: 5000,
        nav: false,
        smartSpeed: 1500,
        mouseDrag: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        nav: true,
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 3
            },
            1000: {
                items: 4
            }
        }
    });


    // slicknav
    $('.mobail-menu').slicknav({
        prependTo: ".menu"
    });

    $(document).on('click', '.slicknav_nav a', function () {
        $('.slicknav_btn').click();
    });

    // 2. Isotope Portfolio 
    $('.grid').imagesLoaded(function() {

        // filter items on button click
        $('.portfolio-menu').on('click', 'button', function() {
            var filterValue = $(this).attr('data-filter');
            $grid.isotope({
                filter: filterValue
            });
        });

        // init Isotope
        var $grid = $('.grid').isotope({
            itemSelector: '.grid-item',
            percentPosition: true,
            masonry: {
                // use outer width of grid-sizer for columnWidth
                columnWidth: '.grid-item',
            }
        });



    });

    $('.portfolio-menu button').on('click', function(event) {
        $(this).siblings('.active').removeClass('active');
        $(this).addClass('active');
        event.preventDefault();
    });


    //. smooth scrolling
    $(function() {
        $('.header-menu ul li  a ,.header-menu ul.mobail-menu li  a, .scrollup').bind('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - 1
            }, 1000, 'easeInOutExpo');
            event.preventDefault();
        });
        $('body').attr('id', 'scrolltop');
    });

    // sticky-header
    $(window).scroll(function() {

        if ($(window).scrollTop() > 10) {
            $('.sticky-header').addClass('sticky');
            $('.scrollup').addClass('show_hide');
        } else {
            $('.sticky-header').removeClass('sticky');
            $('.scrollup').removeClass('show_hide');
        }
    });

    // Education slider
    $('.edu-owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            nav:true
        },
        600:{
            items:2,
            nav:false
        },
        1000:{
            items:3,
            nav:true,
            loop:false
        }
    }
    });

    /* =========================
   EDUCATION ANIMATION
========================= */

document.addEventListener("DOMContentLoaded", function () {

    const educationItems =
        document.querySelectorAll(".education-item");

    const educationObserver = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.2
        }
    );


    educationItems.forEach(function (item, index) {

        // Small delay between each education item
        item.style.transitionDelay = `${index * 0.15}s`;

        educationObserver.observe(item);

    });

});

}(jQuery));


/* =========================================
   MY WORK JOURNEY SLIDER
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const slider = document.querySelector(".journey-slider");

    if (!slider) return;


    const track = slider.querySelector(".journey-track");

    const slides =
        slider.querySelectorAll(".journey-slide");

    const prevButton =
        slider.querySelector(".journey-prev");

    const nextButton =
        slider.querySelector(".journey-next");

    const dotsContainer =
        document.querySelector(".journey-dots");


    let currentIndex = 0;

    let cardsPerView = 3;

    let autoPlay;


    /* =========================================
       GET CARDS PER VIEW
    ========================================= */

    function getCardsPerView() {

        if (window.innerWidth <= 600) {

            return 1;

        }

        if (window.innerWidth <= 900) {

            return 2;

        }

        return 3;

    }


    /* =========================================
       MAX INDEX
    ========================================= */

    function getMaxIndex() {

        return Math.max(
            0,
            slides.length - cardsPerView
        );

    }


    /* =========================================
       CREATE DOTS
    ========================================= */

    function createDots() {

        dotsContainer.innerHTML = "";

        const totalDots =
            getMaxIndex() + 1;


        for (let i = 0; i < totalDots; i++) {

            const dot =
                document.createElement("button");

            dot.classList.add("journey-dot");

            dot.setAttribute(
                "aria-label",
                `Go to slide ${i + 1}`
            );


            if (i === currentIndex) {

                dot.classList.add("active");

            }


            dot.addEventListener(
                "click",
                function () {

                    currentIndex = i;

                    updateSlider();

                    restartAutoPlay();

                }
            );


            dotsContainer.appendChild(dot);

        }

    }


    /* =========================================
       UPDATE SLIDER
    ========================================= */

    function updateSlider() {

        cardsPerView =
            getCardsPerView();


        const maxIndex =
            getMaxIndex();


        if (currentIndex > maxIndex) {

            currentIndex = maxIndex;

        }


        const slideWidth =
            100 / cardsPerView;


        track.style.transform =
            `translateX(-${currentIndex * slideWidth}%)`;


        createDots();

    }


    /* =========================================
       NEXT
    ========================================= */

    function nextSlide() {

        const maxIndex =
            getMaxIndex();


        if (currentIndex < maxIndex) {

            currentIndex++;

        } else {

            currentIndex = 0;

        }


        updateSlider();

    }


    /* =========================================
       PREVIOUS
    ========================================= */

    function previousSlide() {

        const maxIndex =
            getMaxIndex();


        if (currentIndex > 0) {

            currentIndex--;

        } else {

            currentIndex = maxIndex;

        }


        updateSlider();

    }


    /* =========================================
       BUTTON EVENTS
    ========================================= */

    nextButton.addEventListener(
        "click",
        function () {

            nextSlide();

            restartAutoPlay();

        }
    );


    prevButton.addEventListener(
        "click",
        function () {

            previousSlide();

            restartAutoPlay();

        }
    );


    /* =========================================
       AUTO PLAY
    ========================================= */

    function startAutoPlay() {

        autoPlay =
            setInterval(
                nextSlide,
                5000
            );

    }


    function stopAutoPlay() {

        clearInterval(autoPlay);

    }


    function restartAutoPlay() {

        stopAutoPlay();

        startAutoPlay();

    }


    slider.addEventListener(
        "mouseenter",
        stopAutoPlay
    );


    slider.addEventListener(
        "mouseleave",
        startAutoPlay
    );


    /* =========================================
       TOUCH / SWIPE
    ========================================= */

    let touchStartX = 0;

    let touchEndX = 0;


    slider.addEventListener(
        "touchstart",
        function (event) {

            touchStartX =
                event.changedTouches[0].screenX;

            stopAutoPlay();

        },
        {
            passive: true
        }
    );


    slider.addEventListener(
        "touchend",
        function (event) {

            touchEndX =
                event.changedTouches[0].screenX;


            handleSwipe();

            startAutoPlay();

        },
        {
            passive: true
        }
    );


    function handleSwipe() {

        const difference =
            touchStartX - touchEndX;


        if (Math.abs(difference) < 50) {

            return;

        }


        if (difference > 0) {

            nextSlide();

        } else {

            previousSlide();

        }

    }


    /* =========================================
       RESIZE
    ========================================= */

    window.addEventListener(
        "resize",
        function () {

            updateSlider();

        }
    );


    /* =========================================
       INITIALIZE
    ========================================= */

    updateSlider();

    startAutoPlay();

});