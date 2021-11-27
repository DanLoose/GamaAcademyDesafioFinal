const readline = require('readline-sync');   //input
const { criarCurso, exibirCurso, atualizarCurso, deletarCurso, listaCursos } = require('./app');

const minhasOpcoes = `\nOlá, escolha uma opção: 
a) Criar um novo Curso 
b) Exibir um Curso existente(insira o id) 
c) Atualizar Curso existente 
d) Excluir um Curso existente(insira o id) 
e) Listar todos os cursos 
f) Sair\n`;

console.log(minhasOpcoes);

var userInput;
var looping = true;
var repetir = false;
var id, titulo, descricao, imagem, nomeProf;
var listaAulas = [];

while (looping) {

    userInput = readline.question('Digite sua resposta: ');
    userInput = userInput.toLowerCase();
    repetir = false;

    switch (userInput) {
        case 'a':
            //  Criar novo curso
            console.log('Você selecionou a opção de criar um novo curso. Insira os dados do novo curso:');
            handleInput(true, true, true, true, true, true)
            criarCurso(id, titulo, descricao, imagem, nomeProf, listaAulas);
            setRepetir();
            break;
        case 'b':
            //Exibir Curso existente
            console.log('Você selecionou a opção de exibir um curso existente. Insira o id do curso:');
            handleInput(true);
            exibirCurso(id);
            setRepetir();
            break;
        case 'c':
            //  Atualizar curso existente 
            console.log('Você selecionou a opção de atualizar um curso. Insira o id do curso a ser modificado');
            handleInput(true);
            console.log('Digite as novas informações: ');
            handleInput(false, true, true, true, true, true);
            atualizarCurso(id, titulo, descricao, imagem, nomeProf, listaAulas);
            setRepetir();
            break;
        case 'd':
            //  Excluir curso
            console.log('Você selecionou a opção de excluir um curso existente. Insira o ID');
            handleInput(true);
            deletarCurso(id);
            setRepetir();
            break;
        case 'e':
            //  Listar todos os cursos
            console.log('Você selecionou a opção de listar todos os cursos. Estes são os cursos disponiveis: ');
            listaCursos();
            setRepetir();
            break;
        case 'f':
            //  Sair
            looping = false;
            break;
        default:
            console.log('Opção inválida, tente novamente');
            repetir = true;
    }

    if (repetir) console.log(minhasOpcoes);
    else {
        looping = false;
        console.log('Saindo...');
    }

}

function setRepetir() {
    let op = readline.question('Quer fazer outra operacao? S/N: ');
    if (op.toLowerCase() === 's') repetir = true;
    else repetir = false;
}

function handleInput(ID, TITULO, DESCRICAO, IMAGEM, NOMEPROF, LISTAAULAS) {
    if (ID) id = readline.question('Digite o ID: ');
    if (TITULO) titulo = readline.question('Digite o titulo do curso: ');
    if (DESCRICAO) descricao = readline.question('Digite a Descricao do curso: ');
    if (IMAGEM) imagem = readline.question('Digite o caminho da imagem: ');
    if (NOMEPROF) nomeProf = readline.question('Digite o nome do professor: ');
    if (LISTAAULAS) armazenaListaDeAulas();
}

function armazenaListaDeAulas() {
    listaAulas = [];
    console.log('Digite "0" para encerrar a lista de aulas.');
    let cont = 1;
    let response = readline.question(`Elemento ${cont} da lista: `);
    while (response != 0) {
        cont++;
        listaAulas.push(response);
        response = readline.question(`Elemento ${cont} da lista: `);
    }
    console.log('Entrada de aulas encerrada');
}