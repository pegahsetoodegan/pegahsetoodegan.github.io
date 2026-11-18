/* ======================================== */
/* ELEMENTS */
/* ======================================== */

const aboutHero =
    document.getElementById(
        "aboutHero"
    );


const photoLayer =
    document.getElementById(
        "photoLayer"
    );


const openingPhoto =
    document.getElementById(
        "openingPhoto"
    );



/* ======================================== */
/* PHOTOS */
/* ======================================== */

const aboutPhotos = [

    "Images/about-02.jpeg",
    "Images/about-03.jpeg",
    "Images/about-04.jpeg",
    "Images/about-05.jpeg",
    "Images/about-06.jpeg",
    "Images/about-07.jpeg",
    "Images/about-08.jpeg",
    "Images/about-09.jpeg",
    "Images/about-10.jpeg",
    "Images/about-11.jpeg",
    "Images/about-12.jpeg",
    "Images/about-13.jpeg",
    "Images/about-14.jpeg",
    "Images/about-15.jpeg"

];


let photoIndex = 0;

let lastX = null;

let lastY = null;

let lastPhotoTime = 0;

let interactionStarted = false;


const minimumDistance = 90;

const minimumTime = 140;

const maxPhotos = 7;



/* ======================================== */
/* CHECK MOUSE */
/* ======================================== */

const hasMouse =
    window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches;



/* ======================================== */
/* MOUSE INTERACTION */
/* ======================================== */

if (
    hasMouse &&
    aboutHero &&
    photoLayer
) {


    aboutHero.addEventListener(
        "mousemove",
        function (event) {


            const heroRect =
                aboutHero
                    .getBoundingClientRect();


            const layerRect =
                photoLayer
                    .getBoundingClientRect();


            const mouseX =
                event.clientX -
                heroRect.left;


            const mouseY =
                event.clientY -
                heroRect.top;



            if (
                lastX === null ||
                lastY === null
            ) {

                lastX = mouseX;

                lastY = mouseY;

                return;
            }



            const dx =
                mouseX -
                lastX;


            const dy =
                mouseY -
                lastY;


            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            const now =
                Date.now();



            if (
                distance >=
                minimumDistance

                &&

                now -
                lastPhotoTime >=
                minimumTime
            ) {


                const progressX =
                    Math.max(
                        0,
                        Math.min(
                            1,
                            mouseX /
                            heroRect.width
                        )
                    );


                const margin =
                    90;


                const availableWidth =
                    Math.max(
                        1,
                        layerRect.width -
                        margin * 2
                    );


                const x =
                    margin +
                    progressX *
                    availableWidth;


                const y =
                    Math.max(
                        100,
                        Math.min(
                            layerRect.height -
                            100,
                            mouseY
                        )
                    );


                createPhoto(
                    x,
                    y
                );


                lastX =
                    mouseX;


                lastY =
                    mouseY;


                lastPhotoTime =
                    now;

            }

        }
    );

}



/* ======================================== */
/* CREATE PHOTO */
/* ======================================== */

function createPhoto(
    x,
    y
) {


    if (
        !interactionStarted &&
        openingPhoto
    ) {

        interactionStarted = true;

        openingPhoto
            .classList
            .add(
                "faded"
            );

    }



    const existingPhotos =
        photoLayer
            .querySelectorAll(
                ".trail-photo"
            );


    if (
        existingPhotos.length >=
        maxPhotos
    ) {

        existingPhotos[0]
            .remove();

    }



    const image =
        document.createElement(
            "img"
        );


    image.classList.add(
        "trail-photo"
    );


    image.src =
        aboutPhotos[
            photoIndex
        ];


    image.alt =
        "";


    image.style.left =
        x + "px";


    image.style.top =
        y + "px";


    const rotation =
        Math.random()
        * 12
        - 6;


    image.style.rotate =
        rotation + "deg";


    photoLayer.appendChild(
        image
    );


    photoIndex++;


    if (
        photoIndex >=
        aboutPhotos.length
    ) {

        photoIndex = 0;

    }


    setTimeout(
        function () {

            image.remove();

        },
        3200
    );

}



/* ======================================== */
/* MOBILE */
/* ======================================== */

if (
    !hasMouse &&
    openingPhoto
) {


    const mobilePhotos = [

        "Images/about-01.jpeg",
        "Images/about-02.jpeg",
        "Images/about-03.jpeg",
        "Images/about-04.jpeg",
        "Images/about-05.jpeg",
        "Images/about-06.jpeg",
        "Images/about-07.jpeg",
        "Images/about-08.jpeg",
        "Images/about-09.jpeg",
        "Images/about-10.jpeg",
        "Images/about-11.jpeg",
        "Images/about-12.jpeg",
        "Images/about-13.jpeg",
        "Images/about-14.jpeg",
        "Images/about-15.jpeg"

    ];


    let mobileIndex =
        0;


    setInterval(
        function () {


            mobileIndex++;


            if (
                mobileIndex >=
                mobilePhotos.length
            ) {

                mobileIndex =
                    0;

            }


            openingPhoto.src =
                mobilePhotos[
                    mobileIndex
                ];


        },
        2800
    );

}