const Curso = require('./components/Curso');
const Lista = require('./components/ListaDeCursos');
const bd = require('./components/ListaDeCursos.json');

//  Inicia o programa com os dados armazenados no banco de dados (ListaDeCursos.json)
bd.forEach(curso => {
    Lista.push(curso);
})

module.exports = {
    criarCurso(id, titulo, descricao, imagem, professor, aulas) {
        //  Cria e armazena um novo curso no arquivo ListaDeCursos.json

        if (Lista.find(curso => curso.id == id)) {
            console.log('O ID já existe, abortando...');
            return;
        }

        Lista.push(
            new Curso(id, titulo, descricao, imagem, professor, aulas)
        );
        console.log('Curso adicionado com sucesso! \n');

    },

    exibirCurso(id) {
        //  Procura o curso que possui o id correspondente
        Lista.forEach(curso => {
            if (curso.id === id) {
                //  Imprime os dados do curso em forma de tabela
                console.table(curso);
            }
        })
    },

    atualizarCurso(id, titulo, descricao, imagem, professor, aulas) {
        // Procura o curso pelo id
        Lista.forEach(curso => {
            if (curso.id === id) {
                //  Altera todos os dados do curso encontrado
                /*  Uma versão alternativa seria excluir o curso selecionado
                    e recriar a partir do parametro informado 
                */
                curso.id = id;
                curso.titulo = titulo;
                curso.descricao = descricao;
                curso.imagem = imagem;
                curso.professor = professor;

                curso.aulas = [];
                aulas.forEach(aula => {
                    curso.aulas.push(aula);
                })

                curso.ultimaAtualizacao = curso.handleDate(new Date());
            }
        })
    },

    deletarCurso(id) {
        //  Lista de cursos vai receber todos os elementos que não tiverem o id do parametro, tirando-o da lista
        let pos;
        Lista.forEach((curso, index) => {
            if (curso.id == id) pos = index;
        })

        if (pos > -1) Lista.splice(pos, 1);
    },

    listaCursos() {
        //  Imprime, em forma de tabela, todos os cursos armazenados
        console.log(Lista);

    },
}

