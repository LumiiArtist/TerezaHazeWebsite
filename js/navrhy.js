/* ==========================================
   NÁVRHY CAROUSEL
========================================== */


/*
    ONE OBJECT = ONE DESIGN

    image:
        Image filename

    price:
        Price displayed underneath

    noteSk:
        Slovak note

    noteEn:
        English note
*/


const designs = [

    {
        image: "navrh01.jpg",
        price: "400€"
    },

    {
        image: "navrh02.jpg",
        price: "600€"
    },

    {
        image: "navrh03.jpg",
        price: "600€ / 3000€",
        noteSk: "(podľa typu materiálu)",
        noteEn: "(depending on the type of material)"
    },

    {
        image: "navrh04.jpg",
        price: "500€"
    },

    {
        image: "navrh05.jpg",
        price: "???€"
    },

    {
        image: "navrh06.jpg",
        price: "???€"
    },

    {
        image: "navrh07.jpg",
        price: "???€"
    },

    {
        image: "navrh08.jpg",
        price: "???€"
    },

    {
        image: "navrh09.jpg",
        price: "???€"
    },

    {
        image: "navrh10.jpg",
        price: "???€"
    },

    {
        image: "navrh11.jpg",
        price: "???€"
    },

    {
        image: "navrh12.jpg",
        price: "???€"
    },

    {
        image: "navrh13.jpg",
        price: "???€"
    },

    {
        image: "navrh14.jpg",
        price: "???€"
    },

    {
        image: "navrh15.jpg",
        price: "???€"
    },

    {
        image: "navrh16.jpg",
        price: "???€"
    },

    {
        image: "navrh17.jpg",
        price: "???€"
    },

    {
        image: "navrh18.jpg",
        price: "???€"
    },

    {
        image: "navrh19.jpg",
        price: "???€"
    },

    {
        image: "navrh20.jpg",
        price: "???€"
    }

];



/* ==========================================
   ELEMENTS
========================================== */

const track =
    document.getElementById(
        "design-track"
    );

const nextButton =
    document.getElementById(
        "design-next"
    );

const previousButton =
    document.getElementById(
        "design-prev"
    );

const counter =
    document.getElementById(
        "design-counter"
    );



/* ==========================================
   CREATE CARDS
========================================== */

designs.forEach(
    (design, index) => {

        const card =
            document.createElement(
                "article"
            );

        card.classList.add(
            "design-card"
        );


        /*
            Create the note separately.

            This lets us change the note
            when the language changes.
        */

        const note =
            design.noteSk
                ? `
                    <div
                        class="design-note"
                        data-design-note="${index}"
                    >
                        ${design.noteSk}
                    </div>
                `
                : "";


        card.innerHTML = `

            <div class="design-image">

                <img
                    src="assets/images/navrhy/${design.image}"
                    alt="Návrh ${index + 1}"
                >

            </div>


            <div class="design-price">

                ${design.price}

            </div>


            ${note}

        `;


        track.appendChild(card);

    }
);



/* ==========================================
   UPDATE TRANSLATED NOTES
========================================== */

function updateDesignNotes() {

    const language =
        localStorage.getItem("language") || "sk";


    designs.forEach(
        (design, index) => {

            const note =
                document.querySelector(
                    `[data-design-note="${index}"]`
                );


            if (!note) {

                return;

            }


            if (language === "en") {

                note.textContent =
                    design.noteEn || "";

            } else {

                note.textContent =
                    design.noteSk || "";

            }

        }
    );

}



/* ==========================================
   WATCH FOR LANGUAGE CHANGES
========================================== */

window.addEventListener(
    "languageChanged",
    updateDesignNotes
);



/* ==========================================
   CAROUSEL STATE
========================================== */

let currentPosition = 0;



function cardsVisible() {

    if (window.innerWidth <= 600) {

        return 1;

    }


    if (window.innerWidth <= 1000) {

        return 2;

    }


    return 4;

}



/* ==========================================
   MAX POSITION
========================================== */

function maxPosition() {

    return Math.max(
        0,
        designs.length -
        cardsVisible()
    );

}



/* ==========================================
   UPDATE CAROUSEL
========================================== */

function updateCarousel() {

    const visible =
        cardsVisible();


    const cardWidth =
        100 / visible;


    track.style.transform =
        `translateX(
            -${currentPosition * cardWidth}%
        )`;


    updateCounter();

}



/* ==========================================
   COUNTER
========================================== */

function updateCounter() {

    const visible = cardsVisible();

    const currentPage =
        Math.floor(currentPosition / visible) + 1;

    const totalPages =
        Math.ceil(designs.length / visible);

    counter.textContent =
        `${currentPage} / ${totalPages}`;

}



/* ==========================================
   NEXT
========================================== */

function nextDesign() {

    const visible = cardsVisible();
    const max = maxPosition();

    if (currentPosition + visible > max) {

        currentPosition = 0;

    } else {

        currentPosition += visible;

    }

    updateCarousel();

}



/* ==========================================
   PREVIOUS
========================================== */

function previousDesign() {

    const visible = cardsVisible();
    const max = maxPosition();

    if (currentPosition <= 0) {

        currentPosition =
            Math.floor(max / visible) * visible;

    } else {

        currentPosition -= visible;

    }

    updateCarousel();

}



nextButton.addEventListener(
    "click",
    nextDesign
);


previousButton.addEventListener(
    "click",
    previousDesign
);



/* ==========================================
   SWIPE ON PHONE
========================================== */

let touchStart = 0;


track.addEventListener(
    "touchstart",
    event => {

        touchStart =
            event.changedTouches[0]
                .screenX;

    },
    {
        passive: true
    }
);


track.addEventListener(
    "touchend",
    event => {

        const touchEnd =
            event.changedTouches[0]
                .screenX;


        const difference =
            touchStart - touchEnd;


        if (
            Math.abs(difference) < 50
        ) {

            return;

        }


        if (difference > 0) {

            nextDesign();

        } else {

            previousDesign();

        }

    },
    {
        passive: true
    }
);



/* ==========================================
   WINDOW RESIZE
========================================== */

window.addEventListener(
    "resize",
    () => {

        const max =
            maxPosition();


        if (
            currentPosition > max
        ) {

            currentPosition = max;

        }


        updateCarousel();

    }
);



/* ==========================================
   INITIALIZE
========================================== */

updateDesignNotes();

updateCarousel();