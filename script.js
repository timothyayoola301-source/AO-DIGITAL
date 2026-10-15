// Find the theme button
const themeButton = document.getElementById("theme-toggle");

// Check whether a theme was previously saved
const savedTheme = localStorage.getItem("portfolio-theme");

// Apply the saved theme
if (savedTheme === "light") {
    document.body.classList.add("light-mode");
}

// Update the button label
function updateThemeButton() {
    const isLight = document.body.classList.contains("light-mode");

    themeButton.textContent = isLight
        ? "🌙 Dark Mode"
        : "☀️ Light Mode";

    themeButton.setAttribute(
        "aria-label",
        isLight ? "Switch to dark mode" : "Switch to light mode"
    );
}

// Switch themes when the button is clicked
themeButton.addEventListener("click", function () {
    document.body.classList.toggle("light-mode");

    const isLight = document.body.classList.contains("light-mode");

    localStorage.setItem(
        "portfolio-theme",
        isLight ? "light" : "dark"
    );

    updateThemeButton();
});

// Set the correct label on page load
updateThemeButton();