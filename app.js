const Curso = require('./Curso');
let ListaDeCursos = require('./ListaDeCursos.json');

module.exports = {
    criarCurso(id, titulo, descricao, imagem, professor, aulas) {
        //  Cria e armazena um novo curso no arquivo ListaDeCursos.json
        ListaDeCursos.push(
            new Curso(id, titulo, descricao, imagem, professor, aulas)
        );
    },

    exibirCurso(id) {
        //  Procura o curso que possui o id correspondente
        ListaDeCursos.forEach(curso => {
            if (curso.id === id) {
                //  Imprime os dados do curso em forma de tabela
                console.table(curso);
            }
        })
    },

    atualizarCurso(id, titulo, descricao, imagem, professor, aulas) {
        // Procura o curso pelo id
        ListaDeCursos.forEach(curso => {
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
            }
        })
    },

    deletarCurso(id) {
        //  Lista de cursos vai receber todos os elementos que não tiverem o id do parametro, tirando-o da lista
        ListaDeCursos = ListaDeCursos.filter(curso => curso.id !== id);
    },

    listaCursos() {
        //  Imprime, em forma de tabela, todos os cursos armazenados
        ListaDeCursos.forEach(curso => {
            console.table(curso);
        })
    },
}