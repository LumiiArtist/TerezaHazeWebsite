/* ==========================================
   GALLERY DATA
========================================== */

const galleryData = {

    /* --------------------------------------
       COSTUMES / COSPLAY
    -------------------------------------- */

    costumes: {

        title: {
            sk: "KOSTÝMY A COSPLAYE",
            en: "COSTUMES AND COSPLAY"
        },

        description: {
            sk: "Začínala som s cosplayom a kostýmami. Tu je ukážka mojej tvorby v tejto oblasti.",
            en: "I started with cosplay and costumes. Here is a selection of my work in this area."
        },

        images: [
            "assets/images/cs/IMG_7238761.jpg",
            "assets/images/cs/1808_Tereza_166_FB (1).jpg",
            "assets/images/cs/Cyber Ciri.jpg",
            "assets/images/ostatne/costumes/4.jpg",
            "assets/images/ostatne/costumes/4.jpg"
        ]

    },


    /* --------------------------------------
       PROPS / ACCESSORIES
    -------------------------------------- */

    props: {

        title: {
            sk: "REKVIZITY A DOPLŇKY",
            en: "PROPS AND ACCESSORIES"
        },

        description: {
            sk: "Tvorba rekvizít a doplnkov pre rôzne projekty.",
            en: "Props and accessories created for various projects."
        },

        images: [
            "assets/images/ostatne/props/1.jpg",
            "assets/images/ostatne/props/2.jpg",
            "assets/images/ostatne/props/3.jpg",
            "assets/images/ostatne/props/4.jpg"
        ]

    },


    /* --------------------------------------
       CLOTHING / OUTFITS
    -------------------------------------- */

    clothing: {

        title: {
            sk: "OBLEČENIE A OUTFITY",
            en: "CLOTHING AND OUTFITS"
        },

        description: {
            sk: "Tvorba oblečenia a outfitov vytvorených ručne s dôrazom na detail.",
            en: "Handmade clothing and outfits created with attention to detail."
        },

        images: [
            "assets/images/ostatne/clothing/1.jpg",
            "assets/images/ostatne/clothing/2.jpg",
            "assets/images/ostatne/clothing/3.jpg",
            "assets/images/ostatne/clothing/4.jpg"
        ]

    }

};


/* ==========================================
   GET CATEGORY FROM URL
========================================== */

const galleryUrlParams = new URLSearchParams(
    window.location.search
);

const category =
    galleryUrlParams.get("category") || "costumes";


/* ==========================================
   SELECT GALLERY
========================================== */

const selectedGallery =
    galleryData[category] || galleryData.costumes;


/* ==========================================
   ELEMENTS
========================================== */

const galleryTitle =
    document.getElementById("gallery-title");

const galleryDescription =
    document.getElementById("gallery-description");

const carouselTrack =
    document.getElementById("carousel-track");

const previousButton =
    document.getElementById("prev-button");

const nextButton =
    document.getElementById("next-button");


/* ==========================================
   LANGUAGE
========================================== */

let galleryLanguage =
    localStorage.getItem("language") || "sk";


/* ==========================================
   CAROUSEL
========================================== */

let currentIndex = 0;


/* ==========================================
   GET NUMBER OF VISIBLE IMAGES
========================================== */

function getVisibleImages() {

    const width = window.innerWidth;

    if (width <= 600) {
        return 1;
    }

    if (width <= 1000) {
        return 2;
    }

    return 4;
}


/* ==========================================
   UPDATE CAROUSEL
========================================== */

function updateCarousel() {

    if (!carouselTrack) {
        return;
    }

    const visibleImages =
        getVisibleImages();

    const totalImages =
        selectedGallery.images.length;

    const maxIndex =
        Math.max(
            0,
            totalImages - visibleImages
        );


    if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
    }

    if (currentIndex < 0) {
        currentIndex = 0;
    }


    const imageWidth =
        100 / visibleImages;

    const translateX =
        currentIndex * imageWidth;


    carouselTrack.style.transform =
        `translateX(-${translateX}%)`;


    /* --------------------------------------
       PREVIOUS BUTTON
    -------------------------------------- */

    if (previousButton) {

        previousButton.style.display =
            currentIndex <= 0
                ? "none"
                : "flex";

    }


    /* --------------------------------------
       NEXT BUTTON
    -------------------------------------- */

    if (nextButton) {

        nextButton.style.display =
            currentIndex >= maxIndex
                ? "none"
                : "flex";

    }

}


/* ==========================================
   CREATE IMAGES
========================================== */

function createGalleryImages() {

    if (!carouselTrack) {
        return;
    }

    carouselTrack.innerHTML = "";


    selectedGallery.images.forEach(
        function (imagePath, index) {

            const image =
                document.createElement("img");


            image.src = imagePath;


            image.alt =
                `${selectedGallery.title[galleryLanguage]} ${index + 1}`;


            image.classList.add(
                "gallery-image"
            );


            carouselTrack.appendChild(image);

        }
    );


    currentIndex = 0;

    updateCarousel();

}


/* ==========================================
   UPDATE TITLE + DESCRIPTION
========================================== */

function updateGalleryText() {

    if (galleryTitle) {

        galleryTitle.textContent =
            selectedGallery.title[galleryLanguage];

    }


    if (galleryDescription) {

        galleryDescription.innerHTML = "";


        const paragraph =
            document.createElement("p");


        paragraph.textContent =
            selectedGallery.description[galleryLanguage];


        galleryDescription.appendChild(
            paragraph
        );

    }


    /* Update image alt text */

    if (carouselTrack) {

        const images =
            carouselTrack.querySelectorAll(
                ".gallery-image"
            );


        images.forEach(
            function (image, index) {

                image.alt =
                    `${selectedGallery.title[galleryLanguage]} ${index + 1}`;

            }
        );

    }

}


/* ==========================================
   PREVIOUS IMAGE
========================================== */

function showPrevious() {

    currentIndex--;

    updateCarousel();

}


/* ==========================================
   NEXT IMAGE
========================================== */

function showNext() {

    const visibleImages =
        getVisibleImages();

    const maxIndex =
        Math.max(
            0,
            selectedGallery.images.length
            - visibleImages
        );


    if (currentIndex < maxIndex) {

        currentIndex++;

        updateCarousel();

    }

}


/* ==========================================
   BUTTON EVENTS
========================================== */

if (previousButton) {

    previousButton.addEventListener(
        "click",
        showPrevious
    );

}


if (nextButton) {

    nextButton.addEventListener(
        "click",
        showNext
    );

}


/* ==========================================
   LANGUAGE CHANGE
========================================== */

window.addEventListener(
    "languageChanged",
    function () {

        galleryLanguage =
            localStorage.getItem("language")
            || "sk";


        updateGalleryText();

    }
);


/* ==========================================
   RESIZE
========================================== */

window.addEventListener(
    "resize",
    function () {

        updateCarousel();

    }
);


/* ==========================================
   TOUCH / SWIPE
========================================== */

let touchStartX = 0;
let touchEndX = 0;


if (carouselTrack) {

    carouselTrack.addEventListener(
        "touchstart",
        function (event) {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        { passive: true }
    );


    carouselTrack.addEventListener(
        "touchend",
        function (event) {

            touchEndX =
                event.changedTouches[0].screenX;

            handleSwipe();

        },
        { passive: true }
    );

}


function handleSwipe() {

    const difference =
        touchStartX - touchEndX;


    if (Math.abs(difference) < 50) {
        return;
    }


    if (difference > 0) {

        showNext();

    } else {

        showPrevious();

    }

}


/* ==========================================
   KEYBOARD CONTROLS
========================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "ArrowLeft") {

            showPrevious();

        }


        if (event.key === "ArrowRight") {

            showNext();

        }

    }
);


/* ==========================================
   INITIALIZE
========================================== */

createGalleryImages();

updateGalleryText();