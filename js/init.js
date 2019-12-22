(function ($) {

    "use strict";
    $.fn.andSelf = function () {
        return this.addBack.apply(this, arguments);
    }

    /*
    |===================
    | SLIDER Preloader
    |===================
    */
    jQuery(window).load(function () {
        jQuery(".appko-site-preloader-wrap").fadeOut('500');
    });

    /*
    |===================
    | SLIDER Preloader
    |===================
    */
    $(window).on('load', function () {
        $('.slider_preloader_status').fadeOut();
        $('.slider_preloader').delay(350).fadeOut('slow');
        $('.header-slider').removeClass("header-slider-preloader");
    })

    /*
      |===================
      | SLIDER JS
      |===================
    */

    $(window).on('load', function () {
        $('#header-slider #animation-slide').owlCarousel({
            autoHeight: true,
            items: 1,
            loop: true,
            autoplay: true,
            dots: true,
            nav: true,
            autoplayTimeout: 7000,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
            animateIn: "zoomIn",
            animateOut: "fadeOutDown",
            autoplayHoverPause: false,
            touchDrag: true,
            mouseDrag: true
        });
        $("#animation-slide").on("translate.owl.carousel", function () {
            $(this).find(".owl-item .slide-text > *").removeClass("fadeInUp animated").css("opacity", "0");
            $(this).find(".owl-item .slide-img").removeClass("fadeInRight animated").css("opacity", "0");
        });
        $("#animation-slide").on("translated.owl.carousel", function () {
            $(this).find(".owl-item.active .slide-text > *").addClass("fadeInUp animated").css("opacity", "1");
            $(this).find(".owl-item.active .slide-img").addClass("fadeInRight animated").css("opacity", "1");
        });
    });

    /*
    |
    | NAV FIXED ON SCROLL
    |
    */
    $(window).on('scroll', function () {
        var scroll = $(window).scrollTop();
        if (scroll >= 50) {
            $(".nav-scroll").addClass("strict");
        } else {
            $(".nav-scroll").removeClass("strict");
        }
    });


    jQuery(document).ready(function () {

        "use strict";
        /*
        |
        | Mobile NAv trigger
        |
        */

        var trigger = $('.navbar-toggle'),
            overlay = $('.overlay'),
            active = false;

        $('.navbar-toggle, #navbar-nav li a, .overlay').on('click', function () {
            $('.navbar-toggle').toggleClass('active');
            $('#js-navbar-menu').toggleClass('active');
            overlay.toggleClass('active');
        });

        /*
        |
        | WOW ANIMATION
        |
        */
        var wow = new WOW({
            mobile: false // trigger animations on mobile devices (default is true)
        });
        wow.init();

        /*
        |
        | OWL CAROUSEL
        |
        */
        $('#appko-overview').owlCarousel({
            loop: false,
            responsiveClass: true,
            nav: true,
            autoplay: false,
            smartSpeed: 450,
            stopOnHover: true,
            animateIn: 'slideInRight',
            animateOut: 'slideOutLeft',
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1,
                },
                768: {
                    items: 2,
                },
                1170: {
                    items: 2,
                }
            }
        });


        /*
        |
        | Onepage Nav
        |
        */

        $('#navbar').onePageNav({
            currentClass: 'active',
            changeHash: false,
            scrollSpeed: 750,
            scrollThreshold: 0.5,
        });

        $('a[href*="#"]:not([href="#"])').on('click', function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });



        /*
        |
        | MAILCHIMP NEWSLETTER SUBSCRIPTION
        |
        */

        /**
         * ====================================
         * LOCAL NEWSLETTER SUBSCRIPTION
         * ====================================
         */
        $("#local-subscribe").on('submit', function (e) {
            e.preventDefault();
            var data = {
                    email: $("#subscriber-email").val()
                },
                postUrl = $(this).attr('action');

            if (isValidEmail(data['email'])) {
                $.ajax({
                    type: "POST",
                    url: postUrl,
                    data: data,
                    success: function () {
                        $('.subscription-success').fadeIn(1000);
                        $('.subscription-failed').fadeOut(500);
                    }
                });
            } else {
                $('.subscription-failed').fadeIn(1000);
                $('.subscription-success').fadeOut(500);
            }

            return false;
        });

        /*
        |
        | CONTACT FORM
        |
        */

        function formSuccess() {
            $("#contactForm")[0].reset();
            submitMSG(true, "Message Sent!")
        }

        function formError() {
            $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                $(this).removeClass();
            });
        }

        function submitMSG(valid, msg) {
            if (valid) {
                var msgClasses = "h3 text-center fadeInUp animated text-success";
            } else {
                var msgClasses = "h3 text-center shake animated text-danger";
            }
            $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
        }
    });
}(jQuery));