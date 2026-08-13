/* ========================================
   LANGUAGE SWITCHER
======================================== */

const languageSelect = document.getElementById("language-select");


// Get saved language
let currentLanguage = localStorage.getItem("language") || "sk";


// Set selector to saved language
if (languageSelect) {
    languageSelect.value = currentLanguage;
}


// Change all translated text
function setLanguage(language) {

    document.querySelectorAll("[data-sk][data-en]").forEach(element => {

        element.textContent = element.dataset[language];

    });


    // Update HTML language
    document.documentElement.lang = language === "sk" ? "sk" : "en";


    // Remember language
    localStorage.setItem("language", language);

}


// Change language when selector changes
if (languageSelect) {

    languageSelect.addEventListener("change", function () {

        setLanguage(this.value);

    });

}


// Apply language when page loads
setLanguage(currentLanguage);