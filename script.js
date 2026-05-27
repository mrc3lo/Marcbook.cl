// ==========================
// NAVBAR INTELIGENTE
// ==========================

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 40){

        header.classList.add("scrolled");

    }else{

        header.classList.remove("scrolled");
    }

});

const sliders = document.querySelectorAll(".slider-servicio");

sliders.forEach((slider) => {

    const slides = slider.querySelectorAll(".slide");

    let index = 0;

    setInterval(() => {

        slides[index].classList.remove("active");

        index++;

        if(index >= slides.length){

            index = 0;
        }

        slides[index].classList.add("active");

    }, 3500);

});