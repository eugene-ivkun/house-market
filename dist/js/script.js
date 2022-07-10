$(document).ready(function() {

function tabs() {
    let btn = $(this);
    let allbtn = $(".tabs-btn");
    let tabsList = btn.closest(".tabs-wrap").find(".tabs-list");
    let tabsItem = tabsList.find(".tabs-item");
    tabsItem.removeClass("active");
    allbtn.removeClass("active");
    btn.addClass("active");
    if(!!btn.attr("data-tab-id")) {
        tabsList.find("#" + btn.attr("data-tab-id")).addClass("active");
    }
}

function headerMenu() {
    function removeMenu() {
        $(".header-cataloge__inner").removeClass("active");
        $(".header-cataloge__tab").removeClass("active");
        $(".header-cataloge__item").removeClass("active");
        $(".header-cataloge__btn-icon").removeClass("active");
        $(".header-cataloge__nav-wrap").removeClass("active");
    }
    // $(window).resize(removeMenu);

    $(document).click(function(e) {
        if(!!$(e.target).closest(".header-cataloge__btn").length) {
            $(".header-cataloge__inner").toggleClass("active");
            $(".header-cataloge__btn-icon").toggleClass("active");
            $(".header-cataloge__tab").removeClass("active");
            $(".header-cataloge__item").removeClass("active");
            $(".header-cataloge__nav-wrap").removeClass("active");
        }
        if(!$(e.target).closest(".header-cataloge").length) {
            removeMenu();
        }
    })

    let smMedia = window.matchMedia("(max-width: 992px)");
    let lgMedia = window.matchMedia("(min-width: 768px)");

    function menuMedia() {
        if(lgMedia.matches) {
            $(".header-cataloge__tab-head").off("click");
            $(".header-cataloge__nav-wrap").removeClass("active");
            $(".header-cataloge__item").off("click");
            $(".header-cataloge__item").hover(tabs);
        }
        else{
            $(".header-cataloge__item").off("mouseenter mouseleave");
            $(".header-cataloge__item").click(function() {
                tabs.bind(this)();
                if(!!$(this).attr("data-tab-id")) {
                    $(".header-cataloge__nav-wrap").toggleClass("active");
                }
                else  $(".header-cataloge__nav-wrap").removeClass("active");
                $(".header-cataloge__tab-head").click(function() {
                    $(".header-cataloge__nav-wrap").removeClass("active");
                    $(".header-cataloge__tab").removeClass("active");
                })
            });
        }
    }
    menuMedia();
    lgMedia.addEventListener("change", menuMedia);
}
headerMenu();

$(".banner__slider").slick({
    dots: true,
    dotsClass: "banner__slider-dots",
    arrows: false,
    // autoplay: true,
    // autoplaySpeed: 2000,
});

$(".categories__slider").slick({
    slidesToShow: 4,
    mobileFirst: false,
    prevArrow: $(".categories__slider-prev"),
    nextArrow: $(".categories__slider-next"),
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
                centerMode: true,
                initialSlide: 1
            }
        },
        {
            breakpoint: 831,
            settings: {
                slidesToShow: 2,
                centerMode: true,
                centerPadding: "10%",
                arrows: false,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                centerMode: true,
                centerPadding: "10%",
                arrows: false,
            }
        },
        {
            breakpoint: 685,
            settings: {
                slidesToShow: 2,
                centerMode: true,
                centerPadding: "5%",
                arrows: false
            }
        },
        {
            breakpoint: 500,
            settings: {
                slidesToShow: 1,
                centerMode: true,
                centerPadding: "20%",
                arrows: false,
                variableWidth: true,
            }
        },
        {
            breakpoint: 360,
            settings: {
                slidesToShow: 1,
                variableWidth: true,
                arrows: false,
                infinite: false
            }
        }
    ]
});

});

$(window).on("load",function(){
    $(".header-cataloge__nav").mCustomScrollbar({
        scrollbarPosition: "outside",
        updateOnContentResize: true,
        theme: "dark"
    });
});