const btnCriar = document.querySelector('#btnCriarCurso');
const container = document.querySelector('.container');
const btnExcluir = document.querySelector('.excluir');

let meusCursos = [];
window.addEventListener('DOMContentLoaded', () => {
    meusCursos = localStorage.getItem('meusCursos');
    console.log(meusCursos);
})


btnCriar.addEventListener('click', createModalCriar)

btnExcluir.addEventListener('click', (e) => {
    e.target.parentNode.parentNode.remove()
})

function createModalCriar() {
    let modalCriar, divBox, boxHeader, h3, p;
    let inputId, inputName, inputDescricao;

    modalCriar = document.createElement('div');
    divBox = document.createElement('div');
    boxHeader = document.createElement('div');
    h3 = document.createElement('h3');
    p = document.createElement('p');

    h3.innerText = 'Criar curso';
    p.innerText = 'FECHAR';

    inputId = document.createElement('input');
    inputName = document.createElement('input');
    inputDescricao = document.createElement('input');

    modalCriar.classList.add('modalCriar');
    divBox.classList.add('box');
    boxHeader.classList.add('box-header');

    p.addEventListener('click', () => {
        container.removeChild(modalCriar);
    })

    boxHeader.append(h3);
    boxHeader.append(p);

    divBox.append(boxHeader);
    divBox.append(inputId);
    divBox.append(inputName);
    divBox.append(inputDescricao);

    modalCriar.append(divBox)
    container.append(modalCriar);
}