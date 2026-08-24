/* 
   SEARCH
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

/* 
   MENU ACTIVE STATE
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
   LOGO ANIMATION
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