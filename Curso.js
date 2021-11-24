module.exports = class Curso {
    constructor(id, titulo, descricao, imagem, professor, aulas) {

        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.imagem = imagem;
        this.professor = professor;
        this.aulas = [];

        aulas.forEach(aula => this.aulas.push(aula));

        // Armazena o momento de criação do curso em formato hh:mm:ss - dd/mm/aaaa
        this.dataDeCriacao = this.handleDate(new Date());
        this.ultimaAtualizacao = this.dataDeCriacao;
    }

    handleDate(date) {

        let hora = JSON.stringify(date.getHours()).padStart(2, '0');
        let minutos = JSON.stringify(date.getMinutes()).padStart(2, '0');
        let segundos = JSON.stringify(date.getSeconds()).padStart(2, '0');

        let dia = JSON.stringify(date.getDate()).padStart(2, '0');
        let mes = JSON.stringify(date.getMonth()).padStart(2, '0');
        let ano = JSON.stringify(date.getFullYear());

        return `${hora}:${minutos}:${segundos} - ${dia}/${mes}/${ano}`
    }

}
