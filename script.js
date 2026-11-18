/* ======================================== */
/* ARC TEXT ANIMATION */
/* ======================================== */

const arcText =
    document.getElementById("arcText");

const arcTextPath =
    document.getElementById("arcTextPath");

const arcMeasure =
    document.getElementById("arcMeasure");


let arcPaused = false;

let arcOffset = 0;

let lastFrameTime = null;

let segmentLength = 700;


/*
ARC SPEED

Higher number = faster.

100 = slow
180 = medium
250 = fast
*/

const arcSpeed = 190;



/*
Only start the animation
if all arc elements exist.
*/

if (
    arcText &&
    arcTextPath &&
    arcMeasure
) {

    document.fonts.ready.then(
        function () {

            segmentLength =
                arcMeasure.getComputedTextLength();

            arcOffset = 0;

            requestAnimationFrame(
                animateArc
            );

        }
    );


    arcText.addEventListener(
        "mouseenter",
        function () {

            arcPaused = true;

        }
    );


    arcText.addEventListener(
        "mouseleave",
        function () {

            arcPaused = false;

        }
    );

}



function animateArc(time) {


    if (lastFrameTime === null) {

        lastFrameTime = time;

    }


    const deltaTime =
        (time - lastFrameTime)
        / 1000;


    lastFrameTime = time;


    if (!arcPaused) {


        /*
        RIGHT → LEFT
        */

        arcOffset -=
            arcSpeed *
            deltaTime;


        /*
        Infinite loop
        */

        if (
            arcOffset <=
            -segmentLength
        ) {

            arcOffset +=
                segmentLength;

        }


        arcTextPath.setAttribute(
            "startOffset",
            arcOffset
        );

    }


    requestAnimationFrame(
        animateArc
    );

}



/* ======================================== */
/* SELECTED WORK HORIZONTAL SLIDER */
/* ======================================== */

const selectedWork =
    document.getElementById(
        "selectedWork"
    );


const selectedTrack =
    document.getElementById(
        "selectedTrack"
    );


/*
Only initialize slider
if selectedTrack exists.
*/

if (
    selectedWork &&
    selectedTrack
) {


    const originalSlides =
        selectedTrack.querySelectorAll(
            ".selected-slide"
        );


    if (
        originalSlides.length > 0
    ) {


        /*
        Clone first image.

        This creates a continuous loop
        after the last image.
        */

        const firstSlideClone =
            originalSlides[0]
                .cloneNode(true);


        selectedTrack.appendChild(
            firstSlideClone
        );



        let selectedIndex = 0;

        let selectedTimer;



        /*
        TIME BETWEEN IMAGES

        2200 = 2.2 sec
        3000 = 3 sec
        */

        const selectedDelay =
            1200;



        /*
        Sliding animation speed.
        */

        const slideTransition =
            "transform 0.75s cubic-bezier(0.65, 0, 0.35, 1)";



        function nextSelectedSlide() {


            selectedIndex++;


            selectedTrack.style.transition =
                slideTransition;


            selectedTrack.style.transform =
                `translateX(-${selectedIndex * 100}%)`;

        }



        /*
        When the cloned first slide
        appears, reset invisibly
        to the real first slide.
        */

        selectedTrack.addEventListener(
            "transitionend",
            function () {


                if (
                    selectedIndex ===
                    originalSlides.length
                ) {


                    selectedTrack.style.transition =
                        "none";


                    selectedIndex = 0;


                    selectedTrack.style.transform =
                        "translateX(0)";


                    requestAnimationFrame(
                        function () {

                            requestAnimationFrame(
                                function () {

                                    selectedTrack.style.transition =
                                        slideTransition;

                                }
                            );

                        }
                    );

                }

            }
        );



        function startSelectedSlideshow() {


            clearInterval(
                selectedTimer
            );


            selectedTimer =
                setInterval(
                    nextSelectedSlide,
                    selectedDelay
                );

        }



        function stopSelectedSlideshow() {


            clearInterval(
                selectedTimer
            );

        }



        /*
        START
        */

        startSelectedSlideshow();



        /*
        PAUSE ON HOVER
        */

        selectedWork.addEventListener(
            "mouseenter",
            function () {

                stopSelectedSlideshow();

            }
        );



        /*
        RESUME
        */

        selectedWork.addEventListener(
            "mouseleave",
            function () {

                startSelectedSlideshow();

            }
        );

    }

}



/* ======================================== */
/* CURSOR GLOW */
/* ======================================== */

const cursorGlow =
    document.getElementById(
        "cursor-glow"
    );


if (cursorGlow) {


    document.addEventListener(
        "mousemove",
        function (event) {


            cursorGlow.style.left =
                event.clientX
                + "px";


            cursorGlow.style.top =
                event.clientY
                + "px";


            /*
            Create some particles,
            but not on every movement.
            */

            if (
                Math.random()
                > 0.60
            ) {

                createParticle(

                    event.clientX,

                    event.clientY

                );

            }

        }
    );

}



/* ======================================== */
/* CREATE CURSOR PARTICLE */
/* ======================================== */

function createParticle(
    x,
    y
) {


    const particle =
        document.createElement(
            "span"
        );


    particle.classList.add(
        "particle"
    );



    /*
    Random size
    */

    const size =
        Math.random()
        * 3
        + 2;


    particle.style.width =
        size
        + "px";


    particle.style.height =
        size
        + "px";



    /*
    Random direction
    */

    const angle =
        Math.random()
        *
        Math.PI
        *
        2;


    const distance =
        Math.random()
        *
        22;



    particle.style.left =

        x
        +
        Math.cos(angle)
        *
        distance
        +
        "px";


    particle.style.top =

        y
        +
        Math.sin(angle)
        *
        distance
        +
        "px";



    /*
    Outward movement
    */

    const movement =
        Math.random()
        *
        25
        +
        10;



    particle.style.setProperty(

        "--move-x",

        Math.cos(angle)
        *
        movement
        +
        "px"

    );


    particle.style.setProperty(

        "--move-y",

        Math.sin(angle)
        *
        movement
        +
        "px"

    );



    document.body.appendChild(
        particle
    );



    /*
    Remove after animation
    */

    setTimeout(
        function () {

            particle.remove();

        },
        700
    );

}