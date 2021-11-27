var minhaLista = [];

const containerLista = document.querySelector('.containerLista');
const btnCriarCurso = document.querySelector('#btnCriarCurso');
const input = document.querySelector('input[name=input]');

window.addEventListener('DOMContentLoaded', () => {
    console.log(localStorage.getItem('minhaLista'));
    renderizarTela();
})


btnCriarCurso.addEventListener('click', (event) => {
    event.preventDefault();
    if (input.value) {
        criarCurso();
    }
})

function renderizarTela() {

    let lista = createList();

    containerLista.innerHTML = '';

    if (minhaLista) {
        minhaLista.forEach(data => {
            lista.append(createCard(data));
        })

        containerLista.innerHTML = lista;
    }

}

function criarCurso() {
    minhaLista.push(input.value);
    localStorage.setItem('minhaLista', minhaLista);
    renderizarTela();
}

function createCard(data) {
    let card = document.createElement('li');
    card.append(document.createTextNode(`${data.titulo}`))
    return card;
}

function createList() {
    return document.createElement('ul');
}