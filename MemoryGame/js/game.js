const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');


//criando uma array para todas as cartas
const characters = [
    'luffy',
    'robin',
    'brook',
    'chopper',
    'sanji',
    'zoro',
    'usopp',
    'nami',
    'buggy',
    'franky',
]; 

//criando o elemento da carta
const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabledCard');

    if (disabledCards.length == 20) {
        //para o intervalo
        clearInterval(this.loop);
        alert(`Congratulations, ${spanPlayer.innerHTML}, your time has been: ${timer.innerHTML} seconds`);
    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter == secondCharacter) {
        firstCard.firstChild.classList.add('disabledCard');
        secondCard.firstChild.classList.add('disabledCard');

         //setar novamente vazias para limpar as cartas
         firstCard = '';
         secondCard = '';

         checkEndGame();
    } else {

        setTimeout(() => {
            firstCard.classList.remove('revealCard');
            secondCard.classList.remove('revealCard');

            //setar novamente vazias para limpar as cartas
            firstCard = '';
            secondCard = '';
        }, 500); 
    }

}

const revealCard = ({ target}) => {

    if (target.parentNode.className.includes('revealCard')){
        return;
    }

    if (firstCard == ''){
        target.parentNode.classList.add('revealCard');
        firstCard = target.parentNode;
    } else if (secondCard == '') {
        target.parentNode.classList.add('revealCard');
        secondCard = target.parentNode;

        checkCards();
    }
}
    
//criar a carta
const createCard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');
    
    //colocar uma imagem diferente para cada carta
    front.style.backgroundImage = `url(../images/${character}.png)`

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);

    //serve para criar um atributo para cada carta e assim poder comparar se ambas sao iguais ou nao
    card.setAttribute('data-character', character);

    return card;
}

//carregar o jogo
const loadGame = () => {

//duplicar as cartas
const duplicateCharacters = [ ...characters, ...characters];

//embaralhar as cartas
const shuffedArray = duplicateCharacters.sort( () => Math.random() - 0.5);

shuffedArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
}

startTimer = () => {
    this.loop = setInterval(() => {
        const currenttime = +timer.innerHTML;
        timer.innerHTML = currenttime + 1;
    }, 1000);
}

const playAgainButton = document.querySelector('.resetButton');

playAgainButton.addEventListener('click', () => {
  location.reload();
});

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();
    loadGame();
}

