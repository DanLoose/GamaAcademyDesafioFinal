module.exports = class Curso {
    constructor(id, titulo, descricao, imagem, professor, aulas) {

        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.imagem = imagem;
        this.professor = professor;
        this.aulas = [];

        aulas.forEach(aula => this.aulas.push(aula));
    }
}
