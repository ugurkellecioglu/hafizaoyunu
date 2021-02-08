document.addEventListener("DOMContentLoaded", () => {

    //cardArray : arr

    //createGame
        //createTable()
            //flipCard(): func
            //checkMatch() : func
        //showCard()
        //update() : func
            //checkGame
    cardArray = [
        {
            link : "images/image1.jpg"
        },
        {
            link : "images/image2.png"
        },
        {
            link : "images/image3.png"
        },
        {
            link : "images/image4.jpg"
        },
        {
            link : "images/image1.jpg"
        },
        {
            link : "images/image2.png"
        },
        {
            link : "images/image3.png"
        },
        {
            link : "images/image4.jpg"
        }

    ]

    let time;
    let score = 0;

    var cardContainer = document.querySelector('.cardContainer');
    var choosenCards = [];
    function createTable(){
        cardArray = cardArray.sort(() => Math.random() - 0.5)
        for(let i = 0 ; i < cardArray.length; i++){
            var card = document.createElement('div');
            card.className = 'card';
            var img = document.createElement('img');
            img.src = "images/blue.png";
            card.cardId = i;
            card.addEventListener('click', flipCard);
            card.appendChild(img);
            cardContainer.appendChild(card);

        }
    }

    function flipCard(){
      this.childNodes[0].src = cardArray[this.cardId].link;
      choosenCards.push(this);
      if(choosenCards.length === 2){
        
        setTimeout(checkMatch , 500);
        for(let i = 0 ; i < cardArray.length ; i++){
            cardContainer.childNodes[i].removeEventListener('click', flipCard);
        }
        
        
      }
    }

    var cardCount = 0;
    function checkMatch(){
        let card1 = choosenCards[0];
        let card2 = choosenCards[1];
        
        var check = card1.childNodes[0].src==card2.childNodes[0].src;
        if(check){
            cardCount++;
        }
        else{
            card1.childNodes[0].src = "images/blue.png";
            card2.childNodes[0].src = "images/blue.png";

        }

        choosenCards = [];


        for(let i = 0 ; i < cardArray.length ; i++){
            cardContainer.childNodes[i].addEventListener('click', flipCard);
        }
    }

    let showCardInterval = 2000;
    function showCard(){
        let container = document.querySelectorAll('.card');
        for(let i = 0  ; i < cardArray.length; i++){
            container[i].childNodes[0].src = cardArray[container[i].cardId].link;
        }

        setTimeout(() => {
            let container = document.querySelectorAll('.card');
            for(let i = 0  ; i < cardArray.length; i++){
            container[i].childNodes[0].src = 'images/blue.png';
            }
        }, showCardInterval);
    }

    let timeSelect = document.querySelector('#time');
    let scoreSelect = document.querySelector('#score');
    function checkGame(){

        timeSelect.innerHTML = time;
        
        if(time === 0){
            alert("Süreniz bitti. Tamam'a tıkladıktan sonra yeni oyun başlayacaktır.");
            score = 0;
            scoreSelect.innerHTML = score;
            createGame();
        }
        else if(cardCount === cardArray.length / 2){
            alert("Oyunu kazandınız. Tamam'a tıkladıktan sonra yeni oyun başlayacaktır.");
            score++;
            scoreSelect.innerHTML = score;
            cardCount = 0;
            createGame();
        }
        time--;
    }

    var interval;
  
    function update(){
        interval = setInterval(checkGame, 1000);
       
    }
    function createGame(){
        time = 60;
        if(score !== 0){
            time -= 3;
            showCardInterval -= 100;
        }
        choosenCards = [];

        while(cardContainer.firstChild){
            cardContainer.lastChild.remove();
        }

        createTable();
        showCard();
        clearInterval(interval);
        update();

    }

    createGame();
    

});

