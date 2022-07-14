

class Lojista {

    #usuario;
    #senha;
    #logeado;

    constructor(usuario, senha, restaurante, cnpj, telefone, endereco, cardapio=[], pedidoCliente=[]){
        this.#usuario = usuario;
        this.#senha = senha;
        this.restaurante = restaurante;
        this.cnpj = cnpj;
        this.telefone = telefone;
        this.endereco = endereco;
        this.#logeado = false;
        this.cardapio=cardapio
        this.cardapio.push(this.restaurante)
        this.pedidoCliente=pedidoCliente
        this.pedidosEntregues=[]
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
        if(this.#usuario === usuario & this.#senha === senha) {
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

    adicionarProduto (produto,preco){
        const xyz = new Produto (produto,preco)
        this.cardapio.push(xyz)
        console.log (`O produto ${xyz.produto} foi adicionado`)
    }

    mostrarCardapio(){
        console.log (`------------------\nO cardápio do restaurante ${this.restaurante} é `)
        console.log (this.cardapio)
    }

    removerProduto (produto){
        const posicao = this.cardapio.findIndex((item) => item.produto === produto);
        console.log (`O produto ${this.cardapio[posicao].produto} foi removido`)
        this.cardapio.splice(posicao, 1);
    }

    editarProduto(produto,categoria,alteracao){
        const posicao2 = this.cardapio.findIndex((item) => item.produto === produto);

        if (posicao2 == -1){
            console.log("------------------\nEsse produto não existe.")
            return false
        } else {
            if (categoria == "nome"){this.cardapio[posicao2].produto=alteracao
            } else if (categoria == "preco"){this.cardapio[posicao2].preco=alteracao
            } else if (categoria == "descricao"){this.cardapio[posicao2].descricao=alteracao}
        }
        console.log (`O produto ${this.cardapio[posicao2].produto} foi alterado`)
    }

    adicionarPedido(pedido){
        const pedidoID = pedido[1]
        for (let i=2;i < pedido.length; i++) {
            let produtoEscolhido = pedido[i].produto
            let quantidadeEscolhida = pedido[i].quantidade
            const x= new pedidosRecebidos (pedidoID,produtoEscolhido,quantidadeEscolhida)
            this.pedidoCliente.push(x)
        }
        console.log("pedidos do restaurante")
        console.log(this.pedidoCliente)
    }


    confirmarCarrinho (confirmacao,entregador){
        if (confirmacao == true){
            console.log("O seu pedido foi confirmado pelo lojista")
            entregador.tipoUsuario.adicionarPedidosConfirmados(this.pedidoCliente)
  
        } else if (confirmacao == false){
            console.log("O pedido foi cancelado pelo lojista")
        }
    }    

    pedidoCancelado(ID){
        const posicao = this.pedidoCliente.findIndex((item) => item.ID === ID);
        if (posicao == -1){
            console.log("O pedido não pode ser cancelado pois já saiu para entrega")
        } else {
            console.log ("O pedido foi cancelado")
            this.pedidoCliente.splice(posicao, 1);
        }
    }

    pedidoEntregue(ID){
        // console.log("nada")
        let posicao = this.pedidoCliente.findIndex((item) => item.ID === ID);

        while (posicao != -1) {
            this.pedidosEntregues.push(this.pedidoCliente[posicao])
            this.pedidoCliente.splice(posicao, 1);
            posicao = this.pedidoCliente.findIndex((item) => item.ID === ID);
        }


        // for (let i=this.pedidoCliente.length;i>0; i--){
        //     if (this.pedidoCliente[i].ID==ID){
        //         this.pedidosEntregues.push(this.pedidoCliente[i])
        //         this.pedidoCliente.splice(i, 1);
        //     }
        // }
    }
}


class Produto {
    static contador = 0
    constructor(produto, preco){
        this.produto=produto
        this.preco=preco
        this.id= ++Produto.contador
    }
}

class pedidosRecebidos{
    constructor (ID,produto,quantidade){
        this.ID=ID
        this.produto=produto
        this.quantidade=quantidade
    }
}

module.exports = Lojista;

