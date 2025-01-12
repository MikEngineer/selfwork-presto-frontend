// .json: JavaScript Object Notification

// API: chiavi che ci permettono di raggiungere un .json online.

// fetch(): chiamata asincrona che ci permtte di collegarci a un json, il quale viene restituito sotto forma di Promise e poi, con la concatenazione di altri metodi (.then), viene convertito nel dato che ci serve, in questo caso in oggetto.
// .then: questo metodo permette di convertire la Promise nel dato Strutturale e di poterlo utilizzare come tale su JS. Finché rimane nel .json per JS è una stringa.

// 1. fetch() = mi collego al .json e ne ottengo una Promise;
// 2. .then() = converto la Promise in un dato Strutturale JS;
// 3. .then() = utilizzare il dato ottenuto.

// .json() metodo delle Promise per convertirla in Oggetto JS.



fetch("./annunci2.json").then((response)=> response.json()).then((data)=> { 
    //adesso è come se su annunci.json avessi let data = [array di oggetti con i prodotti]
    data.sort((a, b)=> a.price - b.price);

    let radioWrapper = document.querySelector("#radioWrapper");
    let cardWrapper = document.querySelector('#cardWrapper');
    
    
    function radioCreate(){
        let categories = data.map((annuncio)=> annuncio.category);
        
        //     let uniqueCategories = [];
        
        //     categories.forEach((category)=>{
            //         if(!uniqueCategories.includes(category)){
        //             uniqueCategories.push(category)
        //         }
        //     });
        // }
        
        // metodo alternativo
        
        // Set(): classe che mi restituisce, partendo da un array, un nuovo oggetto di tipo Set che contiene solo valori univoci. E' un Set, non un array, quindi potrei usare solo il forEach(). Per convertirlo in array, potrei usare un metodo degli Array che converte in Array un array-like ---> Array.from()
        
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
        // In questa funzione ho bisogno di ottenere un nuovo array, partendo da data, i cui elementi dovranno soddisfare la condizione per cui la loro category sia uguale alla categoria che passiamo alla funzione.

    // La categoria voglio trovarla partendo dalla lista di tutti i bottoni e usare il metodo .find() degli array su questa lista. La condizione da utilizzare è il bottone che possiede l'attributo checked.
        let arrayFromNodeList = Array.from(radioButtons);
        let button = arrayFromNodeList.find((bottone)=> bottone.checked);
        let categoria = button.id;
        // let categoria = Array.from(radioButtons).find((bottone)=> bottone.checked).id;


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
            // filterByCategory(button.id); va lanciata globalFilter
            globalFilter();
        });
    });

    let priceInput = document.querySelector('#priceInput');
    let priceValue = document.querySelector('#priceValue');

    function setPriceInput(array){
        // Dopo aver catturato l'input voglio settare come proprietà max dello stesso il valore più alto tra i price di ogni prodotto. Per farlo avrò bisogno di un array vhe contenga solo i prezzi, a quel punto lo ordino in maniera crescente e prendo l'elemento con il valore più alto.
        let prices = array.map((annuncio)=> +annuncio.price); //il + serve per convertire una stringa in numero. Potrei usare anche Number(annuncio.price)
        prices.sort((a, b)=> a - b);
        let maxPrice = Math.ceil(prices.pop());
        priceInput.max = maxPrice;
        priceInput.value = maxPrice;
        priceValue.innerHTML = maxPrice;
    };

    setPriceInput(filterByCategory(data));



    function filterByPrice(array){
        let filtered = array.filter((annuncio)=> +annuncio.price <= priceInput.value);
        // showCards(filtered);
        return filtered;

    };

    priceInput.addEventListener('input', ()=>{
        priceValue.innerHTML = priceInput.value;
        // filterByPrice();
        globalFilter();
    });

    let wordInput = document.querySelector('#wordInput');

    function filterByWord(array){
        let filtered = array.filter((annuncio)=> annuncio.name.toLowerCase().includes(wordInput.value.toLowerCase()));
        // showCards(filtered);
        return filtered;
    };

    wordInput.addEventListener('input', ()=>{
        // filterByWord();
        globalFilter();
    });

    // Quello di cui abbiamo bisogno è che ad ogni evento scattino tutte e tre le funzioni di filtro ma non siano applicate tutte e tre sull'array datan bensì siano concatenate ed ognuna filtri il risultato della funzione di filtro precedente.

    function globalFilter(){
        let filteredByCategory = filterByCategory(data); //undefined, non ci servono più le showCards() ma i return---> array filtrato per categoria.
        let filteredByPrice = filterByPrice(filteredByCategory); //array filtrato sia per categoria che per prezzo.
        let filteredByWord = filterByWord(filteredByPrice); //array filtrato per categoria prezzo e parola.

        showCards(filteredByWord);
    }

});

// Le differenze sono che non lanciamo showCards per ogni funzione ma viene lanciata una sola volta dentro globalFilter con tutti e tre i filtri. Al posto degli showCards abbiamo i return che ritornano gli array che servono alla funzione successiva. La categoria non viene più passata dall'esterno ma dall'attributo checked.