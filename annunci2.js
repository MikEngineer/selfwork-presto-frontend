fetch("./annunci2.json").then((response)=> response.json()).then((data)=> { 
    data.sort((a, b)=> a.price - b.price);

    let radioWrapper = document.querySelector("#radioWrapper");
    let cardWrapper = document.querySelector('#cardWrapper');
    
    
    function radioCreate(){
        let categories = data.map((annuncio)=> annuncio.category);
        
        let uniqueCategories = Array.from(new Set(categories));
        
        uniqueCategories.forEach((category)=>{
            let div = document.createElement('div');
            div.classList.add("form-check");
            div.innerHTML = `
                <input class="form-check-input" type="radio" name="categories" id="${category}">
                <label class="form-check-label" for="${category}">
                    ${category}
                </label>
            `;
            radioWrapper.appendChild(div);
        });
        
    };

    radioCreate();

    function truncateWord(string){
        if(string.length > 15){
            return string.split(' ')[0] + '...';
        }else{
            return string;
        }
    }

    function showCards(array){
        cardWrapper.innerHTML = '';
        array.forEach((annuncio, i)=>{
            let div = document.createElement('div');
            div.classList.add('card-custom');
            div.innerHTML = `
                <img src="https://picsum.photos/300/?${i}" alt="immagine casuale" class="img-fluid img-card">
                <p class="h2" title="${annuncio.name}">${truncateWord(annuncio.name)}</p>
                <p class="h4">${annuncio.category}</p>
                <p class="lead">${annuncio.price} €</p>
            `;
            cardWrapper.appendChild(div);
        })
    };
    
    showCards(data);

    function filterByCategory(array){
        let arrayFromNodeList = Array.from(radioButtons);
        let button = arrayFromNodeList.find((bottone)=> bottone.checked);
        let categoria = button.id;

        if(categoria != 'All'){
            let filtered = array.filter((annuncio)=> annuncio.category == categoria);
            // showCards(filtered);
            return filtered;
        }else{
            // showCards(data);
            return array;
        }
    };

    let radioButtons = document.querySelectorAll('.form-check-input');

    radioButtons.forEach((button)=>{
        button.addEventListener('click', ()=>{
            setPriceInput(filterByCategory(data));
            globalFilter();
        });
    });

    let priceInput = document.querySelector('#priceInput');
    let priceValue = document.querySelector('#priceValue');

    function setPriceInput(array){
        let prices = array.map((annuncio)=> +annuncio.price);
        prices.sort((a, b)=> a - b);
        let maxPrice = Math.ceil(prices.pop());
        priceInput.max = maxPrice;
        priceInput.value = maxPrice;
        priceValue.innerHTML = maxPrice;
    };

    setPriceInput(filterByCategory(data));



    function filterByPrice(array){
        let filtered = array.filter((annuncio)=> +annuncio.price <= priceInput.value);
        return filtered;

    };

    priceInput.addEventListener('input', ()=>{
        priceValue.innerHTML = priceInput.value;
        globalFilter();
    });

    let wordInput = document.querySelector('#wordInput');

    function filterByWord(array){
        let filtered = array.filter((annuncio)=> annuncio.name.toLowerCase().includes(wordInput.value.toLowerCase()));
        return filtered;
    };

    wordInput.addEventListener('input', ()=>{
        // filterByWord();
        globalFilter();
    });

    function globalFilter(){
        let filteredByCategory = filterByCategory(data); //undefined, non ci servono più le showCards() ma i return---> array filtrato per categoria.
        let filteredByPrice = filterByPrice(filteredByCategory); //array filtrato sia per categoria che per prezzo.
        let filteredByWord = filterByWord(filteredByPrice); //array filtrato per categoria prezzo e parola.

        showCards(filteredByWord);
    }

});