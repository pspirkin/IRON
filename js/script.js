/* =========================================
   IRON — JAVASCRIPT
========================================= */


/* =========================================
   MOBILE MENU
========================================= */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {

        menuToggle.classList.toggle("open");
        mainNav.classList.toggle("open");

    });


    const navLinks = mainNav.querySelectorAll(".nav-link");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            menuToggle.classList.remove("open");
            mainNav.classList.remove("open");

        });

    });

}


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

const navigationLinks =
    document.querySelectorAll(".nav-link");

navigationLinks.forEach(link => {

    const linkPage =
        link.getAttribute("href");

    if (linkPage === currentPage) {
        link.classList.add("active");
    }

});


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* =========================================
   BACK TO TOP
========================================= */

const backToTop =
    document.getElementById("backToTop");

if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });


    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================
   WORKOUT FILTER
========================================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const workoutCards =
    document.querySelectorAll(".training-card");

const searchInput =
    document.getElementById("workoutSearch");

const noResults =
    document.getElementById("noResults");


let activeFilter = "all";


function filterWorkouts() {

    const searchValue =
        searchInput
            ? searchInput.value
                .toLowerCase()
                .trim()
            : "";

    let visibleCount = 0;


    workoutCards.forEach(card => {

        const category =
            card.dataset.category;

        const title =
            card.dataset.title.toLowerCase();

        const description =
            card
                .dataset.description
                .toLowerCase();


        const matchesCategory =
            activeFilter === "all" ||
            category === activeFilter;


        const matchesSearch =
            title.includes(searchValue) ||
            description.includes(searchValue);


        if (matchesCategory && matchesSearch) {

            card.classList.remove("hidden");

            visibleCount++;

        } else {

            card.classList.add("hidden");

        }

    });


    if (noResults) {

        noResults.style.display =
            visibleCount === 0
                ? "block"
                : "none";

    }

}


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        activeFilter =
            button.dataset.filter;

        filterWorkouts();

    });

});


if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterWorkouts
    );

}


/* =========================================
   TRAINING MODAL
========================================= */

const trainingModal =
    document.getElementById("trainingModal");

const detailsButtons =
    document.querySelectorAll(".details-btn");


if (trainingModal) {

    const modalTitle =
        document.getElementById(
            "modalTrainingTitle"
        );

    const modalDescription =
        document.getElementById(
            "modalTrainingDescription"
        );

    const modalDuration =
        document.getElementById(
            "modalDuration"
        );

    const modalLevel =
        document.getElementById(
            "modalLevel"
        );


    detailsButtons.forEach(button => {

        button.addEventListener("click", () => {

            const card =
                button.closest(
                    ".training-card"
                );


            modalTitle.textContent =
                card.dataset.training;


            modalDescription.textContent =
                card.dataset.description;


            modalDuration.textContent =
                card.dataset.duration;


            modalLevel.textContent =
                card.dataset.level;


            openModal(trainingModal);

        });

    });

}


/* =========================================
   MEMBERSHIP MODAL
========================================= */

const planModal =
    document.getElementById("planModal");

const planButtons =
    document.querySelectorAll(".choose-plan");


if (planModal) {

    const planSelect =
        document.getElementById("plan");


    planButtons.forEach(button => {

        button.addEventListener("click", () => {

            const selectedPlan =
                button.dataset.plan;


            planSelect.value =
                selectedPlan;


            openModal(planModal);

        });

    });

}


/* =========================================
   OPEN / CLOSE MODAL
========================================= */

function openModal(modal) {

    if (!modal) {
        return;
    }

    modal.classList.add("active");

    document.body.classList.add("modal-open");

}


function closeModal(modal) {

    if (!modal) {
        return;
    }

    modal.classList.remove("active");

    document.body.classList.remove(
        "modal-open"
    );

}


const allModals =
    document.querySelectorAll(".modal");


allModals.forEach(modal => {

    const closeButton =
        modal.querySelector(".modal-close");

    const overlay =
        modal.querySelector(".modal-overlay");


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            () => closeModal(modal)
        );

    }


    if (overlay) {

        overlay.addEventListener(
            "click",
            () => closeModal(modal)
        );

    }

});


document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            allModals.forEach(modal => {
                closeModal(modal);
            });

        }

    }
);


/* =========================================
   MEMBERSHIP FORM VALIDATION
========================================= */

const membershipForm =
    document.getElementById(
        "membershipForm"
    );


if (membershipForm) {

    membershipForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document.getElementById(
                    "name"
                );

            const phone =
                document.getElementById(
                    "phone"
                );

            const plan =
                document.getElementById(
                    "plan"
                );


            const nameError =
                document.getElementById(
                    "nameError"
                );

            const phoneError =
                document.getElementById(
                    "phoneError"
                );

            const planError =
                document.getElementById(
                    "planError"
                );

            const success =
                document.getElementById(
                    "formSuccess"
                );


            let isValid = true;


            // Reset
            document
                .querySelectorAll(".form-group")
                .forEach(group => {
                    group.classList.remove("error");
                });


            nameError.textContent = "";
            phoneError.textContent = "";
            planError.textContent = "";

            success.classList.remove("show");


            /* NAME */

            if (
                name.value.trim().length < 2
            ) {

                nameError.textContent =
                    "Введіть ім'я.";

                name
                    .closest(".form-group")
                    .classList.add("error");

                isValid = false;

            }


            /* PHONE */

            const phonePattern =
                /^[+]?[0-9\s()-]{10,}$/;


            if (
                !phonePattern.test(
                    phone.value.trim()
                )
            ) {

                phoneError.textContent =
                    "Введіть коректний номер телефону.";

                phone
                    .closest(".form-group")
                    .classList.add("error");

                isValid = false;

            }


            /* PLAN */

            if (!plan.value) {

                planError.textContent =
                    "Оберіть тариф.";

                plan
                    .closest(".form-group")
                    .classList.add("error");

                isValid = false;

            }


            /* SUCCESS */

            if (isValid) {

                success.classList.add("show");

                membershipForm.reset();

                setTimeout(() => {

                    const modal =
                        document.getElementById(
                            "planModal"
                        );

                    closeModal(modal);

                    success.classList.remove(
                        "show"
                    );

                }, 2200);

            }

        }
    );

}


/* =========================================
   ANIMATED STATISTICS
========================================= */

const statNumbers =
    document.querySelectorAll(
        ".stat-number"
    );


function animateNumber(element) {

    const target =
        Number(
            element.dataset.target
        );

    const suffix =
        element.dataset.suffix || "";


    const duration = 1600;

    const startTime =
        performance.now();


    function update(currentTime) {

        const elapsed =
            currentTime - startTime;


        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        // Ease-out animation
        const eased =
            1 - Math.pow(
                1 - progress,
                3
            );


        const current =
            Math.floor(
                eased * target
            );


        element.textContent =
            current.toLocaleString("uk-UA")
            + suffix;


        if (progress < 1) {

            requestAnimationFrame(update);

        } else {

            element.textContent =
                target.toLocaleString("uk-UA")
                + suffix;

        }

    }


    requestAnimationFrame(update);

}


if (statNumbers.length > 0) {

    const statsObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        animateNumber(
                            entry.target
                        );

                        statsObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.5
            }
        );


    statNumbers.forEach(number => {

        statsObserver.observe(number);

    });

}


/* =========================================
   SMOOTH INTERNAL LINKS
========================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");

                const target =
                    document.querySelector(
                        targetId
                    );


                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    });