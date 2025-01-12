// cattura elementi

let navbar = document.querySelector("#navbar");
let links = document.querySelectorAll(".nav-link");
let logoNavbar = document.querySelector("#logoNavbar");
let sword = document.querySelector("#sword");
let collapse = document.querySelector("#collapse")
let check = false;
let firstNumber = document.querySelector("#firstNumber");
let secondNumber = document.querySelector("#secondNumber");
let thirdNumber = document.querySelector("#thirdNumber");
let confirm = true;
let swiperWrapper = document.querySelector(".swiper-wrapper");



// events listener

window.addEventListener("scroll", ()=>{
    let scrolled = window.scrollY;
    
    if (scrolled > 0){
        navbar.classList.remove("bg-blue");
        navbar.classList.add("bg-yellow", "border-bottom-b");
        collapse.classList.remove("bg-blue");
        collapse.classList.add("bg-yellow");
        navbar.style.height = "70px";
        links.forEach((link)=>{
            link.style.color = "var(--blue)"
        });
        logoNavbar.src = "./media/logo-b.png"
        sword.src = "./media/dice-b.png"
    }else{
        navbar.classList.remove("bg-yellow", "border-bottom-b");
        navbar.classList.add("bg-blue");
        collapse.classList.remove("bg-yellow");
        collapse.classList.add("bg-blue");
        navbar.style.height = "140px";
        links.forEach((link)=>{
            link.style.color = "var(--yellow)"
        });
        logoNavbar.src = "./media/logo-y.png"
        sword.src = "./media/dice-y.png"
    }
});

sword.addEventListener("click", ()=>{
    if(check == false){
        sword.style.transform = "rotate(-300deg)";
        check = true;
    }else{
        sword.style.transform = "rotate(0deg)";
        check = false;
    }
});

// Chiamate asincrone
// 1. setInterval(): crea un loop infinito (non bloccando il browser come un for scritto male). Possiamo gestire la durata delle singole iterazioni.
// Il setInteval è una funzione che vuole 2 parametri. Il primo è la callback; il secondo è l'intervallo che deve passare tra una iterazione e l'altra.
// 2. clearInterval(): pulisce l'intervallo e lo ferma.
// 3. setTimeout(): fapartire un blocco di istruzioni dopo tot millisecondi.

// let counter = 0;

// let interval = setInterval(()=>{
    //     if(counter < 100){
//         counter++;
//         console.log(counter);
//     }else{
//         console.log("Adesso mi fermo");
//         clearInterval(interval);
//         // se non scrivessi il clearInterval(), il loop continuerebbe con l'else, riducendo le performances del sito
//     }
// }, 100);

function createInterval(n, element, time){
    let counter = 0;
    
    let interval = setInterval(()=>{
        if(counter < n){
            counter++;
            element.innerHTML = counter;
        }else{
            clearInterval(interval);
        }
    }, time);
    
    setTimeout(()=>{
        confirm = true; //dentro la funzione così scattano entrambe le chiamate asincrone
    }, 8000);
}

// Voglio che i numeri inizino a scorrere quando l'utente inizia a vederli. Dobbiamo usare l'oggetto preimpostato del browser IntersectionObserver: è una Classe del browser che si occupa di far scattare una funzione nel momento in cui sul browser sono visibili gli elementi HTML che noi indichiamo.
// new: è una kw che mi permette di GENERARE un OGGETTO partendo da una Classe.

// Nella variabile stiamo creando un oggetto di Classe IntersectionObserver. In questo oggetto scatta una callback la quale accetta un qualsiasi numero di parametri e li salva nel parametro reale entries, che è un array. Essendo un array, dobbiamo usare forEach.

let observer = new IntersectionObserver((entries)=>{ //automaticamente mette tutti gli entries in un array (...entries, rivedere spread operator). Serve un forEach essendo un array
    entries.forEach((entry)=>{
        if(entry.isIntersecting && confirm){
            createInterval(100, firstNumber, 100);
            createInterval(200, secondNumber, 50);
            createInterval(300, thirdNumber, 20);
            confirm = false;
        }
    });
});

observer.observe(firstNumber);


// Swiper

let reviews = [
    {user: "Matteo", description: "Il più bel sito di annunci del mondo", rank: 5},
    {user: "Miki", description: "Veramente non mi piace per niente", rank: 1},
    {user: "Ale", description: "Mi piace tranne per Star Trek", rank: 3},
    {user: "Anna", description: "Star Wars è meglio", rank: 5},
];

reviews.forEach((review)=>{
    let div = document.createElement("div");
    div.classList.add("swiper-slide");
    div.innerHTML = `
                <div class="swiper-slide">
                <div class="card-review">
                <p class="lead text-center">${review.description}</p>
                <p class="h4 text-center">${review.user}</p>
                <div class="d-flex justify-content-center star">
                
                </div>
                </div>
                </div>
                `;
    swiperWrapper.appendChild(div);
});

let stars = document.querySelectorAll(".star");

stars.forEach((star, index)=>{
    for(let i = 1; i <= reviews[index].rank; i++){
        let icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-star");
        star.appendChild(icon);
    }
    
    let difference = 5 - reviews[index].rank;
    
    for(let i = 1; i <= difference; i++){
        let icon = document.createElement("i");
        icon.classList.add("fa-regular", "fa-star");
        star.appendChild(icon);
    }
    
});





// L'inizializzazione dello swiper deve essere l'ULTIMA cosa, altrimenti non funziona
const swiper = new Swiper('.swiper', {
    // Optional parameters
    effect: "flip",
    grabCursor: true,
    loop: true,
    
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    
    autoplay: {
        delay: 3000,
    },
});