const { criarCurso, exibirCurso, atualizarCurso, deletarCurso, listaCursos } = require('./app');

criarCurso(
    1,
    'GamaAcademy',
    'Curso de desenvolvimento front-end',
    'imagem ainda nao definida',
    'Danilo',
    ['aula1', 'aula2']
);

criarCurso(
    2,
    'DevWeb',
    'Curso de desenvolvimento fullstack',
    'imagem ainda nao definida',
    'Dan',
    ['aula1']
);

criarCurso(
    3,
    'Java',
    'Curso de desenvolvimento java',
    'imagem ainda nao definida',
    'jao',
    ['aula1', 'aula2', 'aula3', 'aula4']
);

console.log('Exibindo os dados do curso de id 1');
exibirCurso(1);

console.log('Atualizando os dados do curso de id 1 ... ');
atualizarCurso(
    1,
    'Gama Academy 2.0',
    'Curso de desenvolvimento front-end master',
    'imagem ainda nao definida',
    'Danilo Loose',
    ['aula1', 'aula2']
);

console.log('Exibindo os dados do curso de id 1 agora atualizados');
exibirCurso(1);

console.log('\n ------------------------------------------------------------------------------ \n');

console.log('Exibindo todos os cursos armazenados na lista de cursos');
listaCursos();

console.log('\n ------------------------------------------------------------------------------ \n');

console.log('Apagando o curso de id 2 ...');
deletarCurso(2);

console.log('Exibindo todos os cursos armazenados na lista de cursos (curso de id 2 agora apagado)');
listaCursos();
