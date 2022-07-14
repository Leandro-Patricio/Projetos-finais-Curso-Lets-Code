const Lojista = require("./LojistaDaniel");
const Cliente = require("./ClienteDaniel");
const Entregador = require("./EntregadorDaniel");

class CadastroUsuario {
    #listaCadastros;

    constructor(usuario, senha, tipo, nomeOuResta, cpfOuCnpj, telefone, endereco) {
        this.#listaCadastros = [];

        if(tipo === "lojista") {
            this.tipoUsuario = new Lojista(usuario, senha, nomeOuResta, cpfOuCnpj, telefone, endereco);
        }

        if(tipo === "cliente") {
            this.tipoUsuario = new Cliente(usuario, senha, nomeOuResta, cpfOuCnpj, telefone, endereco);
        }

        if(tipo === "entregador") {
            this.tipoUsuario = new Entregador(usuario, senha, nomeOuResta, cpfOuCnpj, telefone);
        }

        this.#listaCadastros.push(this.tipoUsuario);
    }
}


module.exports = CadastroUsuario;

