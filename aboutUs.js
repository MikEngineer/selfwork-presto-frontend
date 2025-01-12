let opener = document.querySelector('.opener');
let circle = document.querySelector('.circle');
let flipCard = document.querySelector('.flip-card');

let teachers = [
    {name: 'Matteo', description: 'Docente Frontend di Hackademy 69', url: `https://picsum.photos/250/400?1`},
    {name: 'Marco', description: 'Docente Frontend e responsabile di Hackademy', url: `https://picsum.photos/250/400?2`},
    {name: 'Nicola', description: 'Docente Frontend e noto Sex-Symbol', url: `https://picsum.photos/250/400?3`},
    {name: 'Davide', description: 'Docente Backend e giocatore di ruolo', url: `https://picsum.photos/250/400?4`},
];

teachers.forEach((docente)=>{
    let div = document.createElement('div');
    div.classList.add('moved');
    div.style.backgroundImage = `url(${docente.url})`;
    circle.appendChild(div);
});

let movedDivs = document.querySelectorAll('.moved');

let check = false;

let cardWrapper = document.querySelector('#cardWrapper');


opener.addEventListener('click', ()=>{
    if(check == false){
        opener.style.transform = 'rotate(45deg)';
        movedDivs.forEach((moved, i)=> {
            let angle = (360* i) / movedDivs.length;
            moved.style.transform = `rotate(${angle}deg) translate(150px) rotate(-${angle}deg)`;
        });
        check = true;
    }else{
        check = false;
        opener.style.transform = '';
        movedDivs.forEach((moved, i)=> {
            moved.style.transform = '';
        });
        flipCard.classList.add('d-none');
        // cardWrapper.innerHTML = '';
    }
});

// let flipCard = document.querySelector('.flip-card');
let innerFace = document.querySelector('.inner-face');
let cardName = document.querySelector('#cardName');
let cardDescription = document.querySelector('#cardDescription');

movedDivs.forEach((moved, i)=>{
    moved.addEventListener('click', ()=>{
        flipCard.classList.remove('d-none');
        let docente = teachers[i];
        // flipCard.style.backgroundImage = `url(${docente.url})`;
        innerFace.style.backgroundImage = `url(${docente.url})`;
        cardName.innerHTML = docente.name;
        cardDescription.innerHTML = docente.description;
    });
});

// se volessi fare tutto in JS

// let cardWrapper = document.querySelector('#cardWrapper');

// movedDivs.forEach((moved, i)=>{
//     moved.addEventListener('click', ()=>{
//         let docente = teachers[i];
//         cardWrapper.innerHTML = '';
//         let div = document.createElement('div');
//         div.classList.add('flip-card');
//         div.innerHTML = `
//             <div class="inner">
//                         <div class="inner-face"></div>
//                         <div class="inner-back">
//                             <p id="cardName" class="h4">${docente.name}</p>
//                             <p id="cardDescription" class="lead">${docente.description}</p>
//                         </div>
//                     </div>
//         `;

//         cardWrapper.appendChild(div);
//         let innerFace = document.querySelector('.inner-face');
//         innerFace.style.backgroundImage = `url(${docente.url})`;
//     });
// });