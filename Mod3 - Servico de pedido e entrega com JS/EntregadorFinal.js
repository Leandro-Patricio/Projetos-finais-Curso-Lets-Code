
class Entregador {
    #usuario;
    #senha;
    #logeado;

    constructor(usuario, senha, nome, cpf, telefone, listaPedidosConfirmados = [],listaEntrega=[]){
        this.#usuario = usuario;
        this.#senha = senha;
        this.nome = nome;
        this.cpf = cpf;
        this.telefone = telefone;
        this.#logeado = false;
        this.listaPedidosConfirmados = listaPedidosConfirmados;
        this.listaEntrega=listaEntrega
    }

    getSenha (){
        return this.#senha
    }

    getUsuario (){
        return this.#usuario
    }

    setNovaSenha (novaSenha){
        this.#senha=novaSenha
    }

    setNovoUsuario (novaUsuario){
        this.#usuario=novaUsuario
    }

    login(usuario, senha) {
        if(this.#usuario === usuario && this.#senha === senha) {
            console.log("Usuario Logeado!");
            this.#logeado = true;
        } else {
            console.log("Usuario ou senha invalidos!");
        }
    }

    logout() {
        console.log("Sessão Fechada!");
        this.#logeado = false;
    }

    
    adicionarPedidosConfirmados(pedido){
        for (let i = 0; i < pedido.length; i++) {
            let IDproduto = pedido[i].ID
            let nomeProduto = pedido[i].produto
            let produtoQuantidade = pedido[i].quantidade

            const x = new pedidosParaEntregadores (IDproduto,nomeProduto,produtoQuantidade)
            this.listaPedidosConfirmados.push(x)
        }
    }

    verPedidosConfirmados(){
        console.log (`Lista de pedidos de ${this.nome}`)
        console.log(this.listaPedidosConfirmados)
    }

    entregarPedido(id,restaurante){
        for (var i = 0; i < this.listaPedidosConfirmados.length; i++) {
               if( id === this.listaPedidosConfirmados[i].ID){
                   const nomeProduto=this.listaPedidosConfirmados[i].produto
                   const quantidade=this.listaPedidosConfirmados[i].quantidade
                   const x = new pedidoEntregue (nomeProduto,quantidade)
                   this.listaEntrega.push(x)
               }
        }
        console.log(`O pedido de ID ${id} que ${this.nome} entregará é`)
        console.log(this.listaEntrega)

        restaurante.tipoUsuario.pedidoEntregue(id)
    }

    limparListaEntrega(){
        listaEntrega=[]
    }

    limparPedidosConfirmados(){
        listaPedidosConfirmados=[]
    }

}


class pedidosParaEntregadores {
    constructor (ID,produto,quantidade){
        this.ID=ID
        this.produto=produto
        this.quantidade=quantidade
    }
}

class pedidoEntregue{
    constructor (produto,quantidade){
    this.produto=produto
    this.quantidade=quantidade
    }
}

module.exports = Entregador;
