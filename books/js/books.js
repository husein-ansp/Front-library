const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileNav = document.getElementById("mobileNav");
const bookSearch = document.getElementById("bookSearch");
const searchButton = document.getElementById("searchButton");
const categoryFilter = document.getElementById("categoryFilter");
const sortButton = document.getElementById("sortButton");
const booksTableBody = document.getElementById("booksTableBody");
const noResults = document.getElementById("noResults");
const bookCount = document.getElementById("bookCount");
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
        mobileNav.classList.toggle("open");
        const icon = mobileMenuBtn.querySelector("i");
        if (mobileNav.classList.contains("open")) {
            icon.className = "bi bi-x-lg";
        } else {
            icon.className = "bi bi-list";
        }
    });
}
function getBookRows() {
    return [...booksTableBody.querySelectorAll(".book-row")];
}
function filterBooks() {
    const searchValue = bookSearch.value.trim().toLowerCase();
    const categoryValue = categoryFilter.value;
    let visibleBooks = 0;
    getBookRows().forEach(row => {
        const text = row.textContent.toLowerCase();
        const category = row.dataset.category || "";
        const matchesSearch = !searchValue || text.includes(searchValue);
        const matchesCategory = !categoryValue || category === categoryValue;
        if (matchesSearch && matchesCategory) {
            row.style.display = "";
            visibleBooks++;
        } else {
            row.style.display = "none";
        }
    });
    bookCount.textContent = visibleBooks.toLocaleString("fa-IR");
    if (visibleBooks === 0) {
        noResults.style.display = "block";
    } else {
        noResults.style.display = "none";
    }
}
bookSearch.addEventListener("input", filterBooks);
searchButton.addEventListener("click", () => {
    filterBooks();
    document.querySelector(".books-section").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});
categoryFilter.addEventListener("change", filterBooks);
sortButton.addEventListener("click", () => {
    const rows = getBookRows();
    rows.reverse().forEach(row => {
        booksTableBody.appendChild(row);
    });
});
document.addEventListener("click", event => {
    const detailsButton = event.target.closest(".book-details");
    if (!detailsButton) {
        return;
    }
    const row = detailsButton.closest(".book-row");
    if (!row) {
        return;
    }
    row.classList.add("selected-book");
    setTimeout(() => {
        row.classList.remove("selected-book");
    }, 700);
});
filterBooks();