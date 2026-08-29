const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebarToggle");
if (sidebarToggle) {
    sidebarToggle.addEventListener("click", () => {
        sidebar.classList.toggle("open");
    });
}
document.querySelectorAll(".menu-item[href^='#']").forEach(item => {
    item.addEventListener("click", () => {
        if (window.innerWidth <= 900) {
            sidebar.classList.remove("open");
        }
        document.querySelectorAll(".menu-item").forEach(menu => {
            menu.classList.remove("active");
        });
        item.classList.add("active");
    });
});
document.querySelectorAll("[data-target]").forEach(button => {
    button.addEventListener("click", () => {
        const target = document.getElementById(button.dataset.target);
        if (!target) {
            return;
        }
        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
        document.querySelectorAll(".menu-item").forEach(item => {
            item.classList.remove("active");
            if (item.getAttribute("href") === "#" + button.dataset.target) {
                item.classList.add("active");
            }
        });
        if (window.innerWidth <= 900) {
            sidebar.classList.remove("open");
        }
    });
});
const adminSearch = document.getElementById("adminSearch");
if (adminSearch) {
    adminSearch.addEventListener("input", event => {
        const value = event.target.value.trim().toLowerCase();
        document.querySelectorAll(".admin-section").forEach(section => {
            const text = section.textContent.toLowerCase();
            section.style.display = !value || text.includes(value)
                ? ""
                : "none";
        });
    });
}
function filterTable(inputId, tableBodyId) {
    const input = document.getElementById(inputId);
    const tableBody = document.getElementById(tableBodyId);
    if (!input || !tableBody) {
        return;
    }
    input.addEventListener("input", () => {
        const value = input.value.trim().toLowerCase();
        tableBody.querySelectorAll("tr").forEach(row => {
            row.style.display = row.textContent.toLowerCase().includes(value)
                ? ""
                : "none";
        });
    });
}
filterTable("userSearch", "usersTableBody");
filterTable("bookSearch", "booksTableBody");
filterTable("returnSearch", "returnsTableBody");
document.addEventListener("click", event => {
    const deleteButton = event.target.closest(".delete-book");
    if (!deleteButton) {
        return;
    }
    const confirmed = confirm("آیا از حذف این کتاب مطمئن هستید؟");
    if (!confirmed) {
        return;
    }
    const row = deleteButton.closest("tr");
    if (row) {
        row.remove();
    }
});
document.querySelectorAll("form").forEach(form => {
    form.addEventListener("submit", event => {
        event.preventDefault();
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        console.log("Form ready for backend:", form.id);
    });
});
const sections = document.querySelectorAll(".admin-section");
const menuItems = document.querySelectorAll(".menu-item[href^='#']");
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        }
        const id = entry.target.id;
        menuItems.forEach(item => {
            item.classList.toggle(
                "active",
                item.getAttribute("href") === "#" + id
            );
        });
    });
}, {
    rootMargin: "-25% 0px -65% 0px"
});
sections.forEach(section => observer.observe(section));
window.addEventListener("resize", () => {
    if (window.innerWidth > 900 && sidebar) {
        sidebar.classList.remove("open");
    }
});