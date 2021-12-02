// Inicialização de variáveis
const btnCriar = document.querySelector('#btnCriarCurso');
const container = document.querySelector('.container');
const containerCursos = document.querySelector('.containerLista');
const pesquisar = document.querySelector('input[name=input]');
var meusCursos = [];

//  Inicialização da página
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('meusCursos')) {
        meusCursos = JSON.parse(localStorage.getItem('meusCursos'));
    }
    render();
});

//  Event Listeners
btnCriar.addEventListener('click', createModal);
pesquisar.addEventListener('input', (e) => {
    render(e.target.value);
});

//  Funções 
function generateId() {
    return Math.floor(Math.random() * 15000);
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

//  Gerenciando HTML 
function render(data) {
    containerCursos.innerHTML = '';
    let cont = 0;

    meusCursos.forEach(curso => {

        if (data) {
            let input = data.toLowerCase();
            let tituloLower = curso.titulo.toLowerCase();
            if (tituloLower.includes(input)) {
                containerCursos.appendChild(createCard(curso.titulo, curso.descricao));
                cont++;
            }
        }
        else {
            cont++;
            containerCursos.appendChild(createCard(curso.titulo, curso.descricao));
        }
    })

    if (cont == 0) {
        containerCursos.innerText = 'Nenhum curso encontrado.';
    }
}
function createModal() {
    let modal, box, boxHeader, boxContent, h3, p;
    let inputId, inputName, inputDescricao, btnCriarCurso;

    modal = createElement('div');
    box = createElement('div');
    boxHeader = createElement('div');
    boxContent = createElement('div');
    h3 = createElement('h3');
    p = createElement('p');
    inputId = createElement('input');
    inputName = createElement('input');
    inputDescricao = createElement('textarea');
    btnCriarCurso = createElement('button');

    h3.innerText = 'Criar curso';
    p.innerText = 'FECHAR';
    inputId.value = generateId();
    inputId.setAttribute('disabled', 'disabled');
    inputName.setAttribute('placeholder', 'Nome do curso');
    inputDescricao.setAttribute('placeholder', 'Descrição');
    inputDescricao.setAttribute('rows', 7);
    inputDescricao.style.resize = 'none';
    inputDescricao.style.overflow = 'auto';
    btnCriarCurso.innerText = 'Criar';

    btnCriarCurso.addEventListener('click', (e) => {
        criarCurso(inputId, inputName, inputDescricao);
        e.target.parentNode.parentNode.parentNode.remove();
    });

    p.addEventListener('click', () => {
        container.removeChild(modal);
    })

    modal.classList.add('modal');
    box.classList.add('box');
    boxHeader.classList.add('box-header');
    boxContent.classList.add('box-content');

    boxContent.append(inputId);
    boxContent.append(inputName);
    boxContent.append(inputDescricao);
    boxContent.append(btnCriarCurso);
    boxHeader.append(h3);
    boxHeader.append(p);
    box.append(boxHeader);
    box.append(boxContent);
    modal.append(box)
    container.append(modal);
}
function createElement(element) {
    return document.createElement(element);
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
        let targetToRemove = e.target.parentNode.parentNode;
        targetToRemove.style.opacity = '0';
        setTimeout(() => { targetToRemove.remove() }, 300);
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

/*
    FALTA IMPLEMENTAR
        -> Botão de Editar card existente
        -> Clicar no card e ver aparecer um modal com informações detalhadas
        -> Adicionar fotos em cada card
        -> Poder ver o id de cada card, além de poder adicionar o professor
        -> Mudar para um estilo mais bonito
*/