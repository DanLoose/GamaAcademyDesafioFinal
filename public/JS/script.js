// Inicialização de variáveis
const btnCriar = document.querySelector('#btnCriarCurso');
const btnCursoAleatorio = document.querySelector('#btnCursoAleatorio');
const container = document.querySelector('.container');
const containerCursos = document.querySelector('.containerLista');
const pesquisar = document.querySelector('input[name=input]');
var meusCursos = [];

// window.addEventListener('click', (e) => { console.log(e.target); })

//  Inicialização da página
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('meusCursos')) {
        meusCursos = JSON.parse(localStorage.getItem('meusCursos'));
    }
    render();
});

//  Event Listeners
btnCriar.addEventListener('click', createModal);
btnCursoAleatorio.addEventListener('click', () => {
    criarCurso('tanto faz', 'tanto faz', 'tanto faz', 'tanto faz');
})
pesquisar.addEventListener('input', (e) => {
    render(e.target.value);
});

//  Funções 
function generateId() {
    return Math.floor(Math.random() * 15000);
}
function criarCurso(inputId, inputName, inputProfessor, inputDescricao) {
    if (inputId.value != '' &&
        inputName.value != '' &&
        inputProfessor.value != '' &&
        inputDescricao.value != '') {
        let myObj = {
            id: inputId.value,
            titulo: inputName.value,
            professor: inputProfessor.value,
            descricao: inputDescricao.value,
        }
        meusCursos.push(myObj);
        localStorage.setItem('meusCursos', JSON.stringify(meusCursos));
    }
    inputId.value = '';
    inputName.value = '';
    inputProfessor.value = '';
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
            if (tituloLower.includes(input) || curso.id.includes(data)) {
                containerCursos.appendChild(createCard(curso.id, curso.titulo, curso.descricao, curso.professor));
                cont++;
            }
        }
        else {
            cont++;
            containerCursos.appendChild(createCard(curso.id, curso.titulo, curso.descricao, curso.professor));
        }
    })

    if (cont == 0) {
        containerCursos.innerText = 'Nenhum curso encontrado.';
    }
}
function createModal() {
    let modal, box, boxHeader, boxContent, h3, p;
    let inputId, inputName, inputProfessor, inputDescricao, btnCriarCurso;

    modal = createElement('div');
    box = createElement('div');
    boxHeader = createElement('div');
    boxContent = createElement('div');
    h3 = createElement('h3');
    p = createElement('p');
    inputId = createElement('input');
    inputName = createElement('input');
    inputProfessor = createElement('input');
    inputDescricao = createElement('textarea');
    btnCriarCurso = createElement('button');

    h3.innerText = 'Criar curso';
    p.innerText = 'FECHAR';
    inputId.value = generateId();
    inputId.setAttribute('disabled', 'disabled');
    inputName.setAttribute('placeholder', 'Nome do curso');
    inputProfessor.setAttribute('placeholder', 'Nome do professor');
    inputDescricao.setAttribute('placeholder', 'Descrição');
    inputDescricao.setAttribute('rows', 7);
    inputDescricao.style.resize = 'none';
    inputDescricao.style.overflow = 'auto';
    btnCriarCurso.innerText = 'Criar';

    btnCriarCurso.addEventListener('click', (e) => {
        criarCurso(inputId, inputName, inputProfessor, inputDescricao);
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
    boxContent.append(inputProfessor);
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
function createCard(ID, TITULO, DESCRICAO, PROFESSOR) {
    let card = createElement('li');
    card.classList.add('card');

    //  ==============CARD========================
    let content = createElement('div');
    let buttons = createElement('div');

    content.classList.add('content');
    buttons.classList.add('buttons');

    card.append(content);
    card.append(buttons);
    //  ===============CONTENT===================
    let imagem = createElement('div');
    let textContent = createElement('div');

    imagem.classList.add('imagem');
    textContent.classList.add('text-content');

    content.append(imagem);
    content.append(textContent);

    //  ================TEXT CONTENT====================
    let titulo = createElement('div');
    let descricao = createElement('div');
    let professor = createElement('div');

    titulo.classList.add('titulo');
    descricao.classList.add('descricao');
    professor.classList.add('professor');

    titulo.innerText = ID + " - " + TITULO;
    descricao.innerText = DESCRICAO;
    professor.innerText = PROFESSOR;

    textContent.append(titulo);
    textContent.append(professor);
    textContent.append(descricao);

    //  ================BUTTONS===================
    let excluir = createElement('div');
    let editar = createElement('div');

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
    card.addEventListener('click', (e) => {
        if (e.target !== excluir && e.target !== editar) showCard(e, ID, TITULO, PROFESSOR, DESCRICAO);
        // console.log(e.target);
    });
    return card;
}
function showCard(e, ID, TITULO, PROFESSOR, DESCRICAO) {
    // console.log('showCard', e.target);

    let modal = createElement('div');
    let box = createElement('div');
    let titulo = createElement('h3');
    let professor = createElement('p');
    let descricao = createElement('p');

    modal.addEventListener('click', (e) => {
        if (e.target == modal) e.target.remove();
    })

    titulo.innerText = `${ID} - ${TITULO}`;
    professor.innerText = PROFESSOR;
    descricao.innerText = DESCRICAO;

    box.append(titulo, professor, descricao);

    box.classList.add('box');
    modal.classList.add('modal');

    modal.append(box);
    container.append(modal);
}
/*
    FALTA IMPLEMENTAR
        -> Botão de Editar card
        -> Adicionar fotos em cada card
        -> Mudar para um estilo mais bonito
*/