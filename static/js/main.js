document.addEventListener("DOMContentLoaded", function () {

    /* 
       SEARCH
    */

    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");
    if (searchForm && searchInput) {
        searchForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const searchValue = searchInput.value.trim();
            if (searchValue === "") {
                searchInput.focus();
                return;
            }
            console.log("Searching for:", searchValue);
            alert("در حال جستجو برای: " + searchValue);
        });
    }

    /* 
    menu
    */

    const menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach(function (item) {
        item.addEventListener("click", function () {
            menuItems.forEach(function (element) {
                element.classList.remove("active");
            });
            this.classList.add("active");
        });
    });

    /* 
    slider
    */

    const slides = document.querySelectorAll(".library-slide");
    const dots = document.querySelectorAll(".slider-dot");
    const previousButton = document.getElementById("sliderPrev");
    const nextButton = document.getElementById("sliderNext");
    let currentSlide = 0;
    let sliderTimer = null;
    function showSlide(index) {
        if (slides.length === 0) {
            return;
        }
        if (index >= slides.length) {
            index = 0;
        }
        if (index < 0) {
            index = slides.length - 1;
        }
        slides.forEach(function (slide) {
            slide.classList.remove("active");
        });
        dots.forEach(function (dot) {
            dot.classList.remove("active");
        });
        slides[index].classList.add("active");
        if (dots[index]) {
            dots[index].classList.add("active");
        }
        currentSlide = index;
    }
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    function previousSlide() {
        showSlide(currentSlide - 1);
    }
    function startSlider() {
        if (slides.length <= 1) {
            return;
        }
        clearInterval(sliderTimer);
        sliderTimer = setInterval(function () {
            nextSlide();
        }, 5000);
    }
    function restartSlider() {
        clearInterval(sliderTimer);
        startSlider();
    }
    if (nextButton) {
        nextButton.addEventListener("click", function () {
            nextSlide();
            restartSlider();
        });
    }
    if (previousButton) {
        previousButton.addEventListener("click", function () {
            previousSlide();
            restartSlider();
        });
    }
    dots.forEach(function (dot) {
        dot.addEventListener("click", function () {
            const slideIndex = Number(this.dataset.slide);
            if (!Number.isNaN(slideIndex)) {
                showSlide(slideIndex);
                restartSlider();
            }
        });
    });
    if (slides.length > 0) {
        showSlide(0);
        startSlider();
    }
});