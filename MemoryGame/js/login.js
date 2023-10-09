//Author: Diego Portella
//Date: 2023-10-09


const input = document.querySelector('.loginInput');
const button = document.querySelector('.loginButton');
const form = document.querySelector('.loginForm');
const errorContainer = document.querySelector('.errorContainer');

const validateInput = ({ target }) => {
    if (target.value.length > 2) {
        button.removeAttribute('disabled');
    } else {
        button.setAttribute('disabled', '');
    }
}

const handleSubmit = (event) => {
    event.preventDefault();

    try {
        if (!input.value || input.value.length <= 2) {
            throw new Error('Please, provide a valid name.');
        }

        localStorage.setItem('player', input.value);
        window.location = '../pages/game.html';
    } catch (error) {
        displayError(error.message);
    }
}

const displayError = (errorMessage) => {
    // Exibe a mensagem de erro no contêiner de erro
    errorContainer.textContent = errorMessage;
}

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);
