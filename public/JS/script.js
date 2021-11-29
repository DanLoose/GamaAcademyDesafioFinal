const btnCriar = document.querySelector('#btnCriarCurso');
const container = document.querySelector('.container');
const containerCursos = document.querySelector('.containerLista');

var meusCursos = [];
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('meusCursos')) {
        meusCursos = JSON.parse(localStorage.getItem('meusCursos'));
    }
    render();
})


btnCriar.addEventListener('click', createModalCriar)

function createModalCriar() {
    let modalCriar, divBox, boxHeader, h3, p;
    let inputId, inputName, inputDescricao, btnCriarCurso;

    modalCriar = document.createElement('div');
    divBox = document.createElement('div');
    boxHeader = document.createElement('div');
    h3 = document.createElement('h3');
    p = document.createElement('p');

    h3.innerText = 'Criar curso';
    p.innerText = 'FECHAR';

    inputId = document.createElement('input');
    inputName = document.createElement('input');
    inputDescricao = document.createElement('textarea');
    btnCriarCurso = document.createElement('button');

    btnCriarCurso.addEventListener('click', () => {
        criarCurso(inputId, inputName, inputDescricao);
    });

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
    divBox.append(btnCriarCurso);

    modalCriar.append(divBox)
    container.append(modalCriar);
}

function criarCurso(inputId, inputName, inputDescricao) {
    if (inputId.value != '' &&
        inputName.value != '' &&
        inputDescricao.value != '') {
        let myObj = {
            id: inputId.value,
            titulo: inputName.value,
            descricao: inputDescricao.value,
        }
        meusCursos.push(myObj);
        localStorage.setItem('meusCursos', JSON.stringify(meusCursos));
    }
    inputId.value = '';
    inputName.value = '';
    inputDescricao.value = '';
    render();
}

function render() {
    meusCursos = meusCursos;
    containerCursos.innerHTML = '';
    meusCursos.forEach(curso => {

        containerCursos.appendChild(createCard(curso.titulo, curso.descricao));

    })
}

function createCard(TITULO, DESCRICAO) {
    let card = document.createElement('li');
    card.classList.add('card');

    //  ==============CARD========================
    let content = document.createElement('div');
    let buttons = document.createElement('div');

    content.classList.add('content');
    buttons.classList.add('buttons');

    card.append(content);
    card.append(buttons);
    //  ===============CONTENT===================
    let imagem = document.createElement('div');
    let textContent = document.createElement('div');

    imagem.classList.add('imagem');
    textContent.classList.add('text-content');

    content.append(imagem);
    content.append(textContent);

    //  ================TEXT CONTENT====================
    let titulo = document.createElement('div');
    let descricao = document.createElement('div');
    let professor = document.createElement('div');

    titulo.classList.add('titulo');
    descricao.classList.add('descricao');
    professor.classList.add('professor');

    titulo.innerText = TITULO;
    descricao.innerText = DESCRICAO;
    professor.innerText = 'qualquer';

    textContent.append(titulo);
    textContent.append(descricao);
    textContent.append(professor);

    //  ================BUTTONS===================
    let excluir = document.createElement('div');
    let editar = document.createElement('div');

    excluir.classList.add('excluir');
    editar.classList.add('editar');

    excluir.addEventListener('click', (e) => {
        e.target.parentNode.parentNode.remove();
        meusCursos.splice(meusCursos.findIndex(curso => curso.titulo == TITULO && curso.descricao == DESCRICAO), 1);
        localStorage.setItem('meusCursos', JSON.stringify(meusCursos));
    })

    excluir.innerText = 'Excluir';
    editar.innerText = 'Editar';

    buttons.append(excluir);
    buttons.append(editar);

    //============================================
    return card;
}


