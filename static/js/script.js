/* 
search
*/

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
if (searchForm) {
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
logo
*/

const logo = document.querySelector(".library-logo");
if (logo) {
    logo.addEventListener("mouseenter", function () {
        document.querySelector(".logo-icon").style.transform =
            "rotate(-8deg) scale(1.08)";
    });
    logo.addEventListener("mouseleave", function () {
        document.querySelector(".logo-icon").style.transform =
            "";
    });
}

/* 
library slider
*/

const slides = document.querySelectorAll(".library-slide");
const dots = document.querySelectorAll(".slider-dot");
const previousButton = document.getElementById("sliderPrev");
const nextButton = document.getElementById("sliderNext");
let currentSlide = 0;
let sliderTimer;

/*
show slide
*/

function showSlide(index) {
    if (slides.length === 0) {
        return;
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
    let nextIndex = currentSlide + 1;
    if (nextIndex >= slides.length) {
        nextIndex = 0;
    }
    showSlide(nextIndex);
}

/* 
previous
*/

function previousSlide() {
    let previousIndex = currentSlide - 1;
    if (previousIndex < 0) {
        previousIndex = slides.length - 1;
    }
    showSlide(previousIndex);
}

/* 
buttons
*/

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

/* 
dots
*/

dots.forEach(function (dot) {
    dot.addEventListener("click", function () {
        const slideIndex =
            Number(this.dataset.slide);
        showSlide(slideIndex);
        restartSlider();
    });
});

/* 
auto play
*/

function startSlider() {
    sliderTimer = setInterval(function () {
        nextSlide();
    }, 5000);
}
function restartSlider() {
    clearInterval(sliderTimer);
    startSlider();
}
if (slides.length > 0) {
    showSlide(0);
    startSlider();
}