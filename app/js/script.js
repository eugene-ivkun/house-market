$(document).ready(function() {

// Табы
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
// Включить/Выключить меню
        function headerBtn() {
            $(".header-cataloge__inner").toggleClass("active");
            $(".header-cataloge__btn-icon").toggleClass("active");
            $(".header-cataloge__item").removeClass("active");
            $(".header-cataloge__tab").removeClass("active");
            $(".header-cataloge__nav-wrap").removeClass("active");
        }
        function removeMenu() {
            $(".header-cataloge__inner").removeClass("active");
            $(".header-cataloge__btn-icon").removeClass("active");
            $(".header-cataloge__tab").removeClass("active");
            $(".header-cataloge__nav-wrap").removeClass("active");
        }
// Медиазапросы для меню
        let mediaSm = window.matchMedia("(max-width: 768px)");
        function headerMenu() {
            removeMenu();
            if(mediaSm.matches) {
                $(".header-cataloge").off("mouseenter mouseleave");
                $(".header-cataloge__item").off("mouseenter mouseleave")
                $(".header-cataloge__btn").click(headerBtn);
                $(".header-cataloge__item").click(function() {
                    tabs.bind(this)();
                    if(!!$(this).attr("data-tab-id")) {
                        $(".header-cataloge__nav-wrap").toggleClass("active");
                    }
                    else  $(".header-cataloge__nav-wrap").removeClass("active");
                });
                $(document).click(function (e) {
                    if( !$(e.target).closest(".header-cataloge").length ) {
                        removeMenu();
                    }
                });
                $(".header-cataloge__tab-head").click(function() {
                    $(".header-cataloge__nav-wrap").removeClass("active");
                    $(".header-cataloge__tab").removeClass("active");
                })
            }
            else {
                $(".header-cataloge__btn").off("click");
                $(".header-cataloge__item").off("click");
                $(".header-cataloge").hover(headerBtn);
                $(".header-cataloge__item").hover(tabs);
                $(".header-cataloge__tab-head").off("click");
            }
        }
        mediaSm.addEventListener("change", headerMenu);
        headerMenu();

    

});

$(window).on("load",function(){
    $(".header-cataloge__nav").mCustomScrollbar({
        scrollbarPosition: "outside",
        updateOnContentResize: true,
        theme: "dark"
    });
});