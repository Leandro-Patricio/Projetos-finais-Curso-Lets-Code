

class Cliente {
    #usuario;
    #senha;
    #logeado;

    constructor(usuario, senha, nome, cpf, telefone, endereco, carrinho=[]){
        this.#usuario = usuario;
        this.#senha = senha;
        this.nome = nome;
        this.cpf = cpf;
        this.telefone = telefone;
        this.endereco = endereco;
        this.#logeado = false;
        this.carrinho = carrinho
        this.carrinho.push(`Carrinho de ID:`)
        this.carrinho.push(this.cpf)
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

	verCardapio(restaurante) {
        if(this.#logeado) {
            restaurante.mostrarCardapio();
        } else {
            console.log("Tem que fazer login!");
        }
	}
	
    addItem (restauranteCardapio,produto,quantidade){
        const posicao = restauranteCardapio.findIndex((item) => item.produto === produto);
        const precoUnitario = restauranteCardapio[posicao].preco
        const precoProdutos = restauranteCardapio[posicao].preco * quantidade

        const x= new produtosCarrinho (produto,quantidade,precoUnitario,precoProdutos)
        this.carrinho.push(x)
        console.log(`O produto ${restauranteCardapio[posicao].produto} foi adicionado ao seu carrinho.`)
    }

    removerItem (produto){
        const posicao2 = this.carrinho.findIndex((item) => item.produto === produto);
        console.log (`O produto ${this.carrinho[posicao2].produto} foi removido`)
        this.carrinho.splice(posicao2, 1); 
    }

    editarItem(produto,quantidadeAlterada){
        const posicao3 = this.carrinho.findIndex((item) => item.produto === produto);

        if (posicao3 == -1){
            console.log("------------------\nEsse produto não existe.")
            return false
        } else {
            this.carrinho[posicao3].quantidade=quantidadeAlterada
        } 

        console.log (`A quantidade do produto ${this.carrinho[posicao3].produto} foi alterada para ${this.carrinho[posicao3].quantidade}`)
    }

    limparCarrinho(){
        console.log("O carrinho foi esvaziado.")
        this.carrinho = []
        this.carrinho.push(`Carrinho de ID:`)
        this.carrinho.push(`${this.cpf}`)
        return "O carrinho está vazio"
    }

    visualizarPedido() {
        if (this.carrinho== (``)){
            console.log (`O carrinho de ${this.nome} está vazio`)
        } else { 
        console.log (`--------------------\n`)
        console.log (`Pedido de ${this.nome}`)

        console.log(`Preço total a ser pago:R$${this.calcularPrecoTotal()}`)
        console.log (this.carrinho)
        }
    }

    calcularPrecoTotal(){
        let total = 0;
        for (var i = 2; i < this.carrinho.length; i++) {
               total = total + this.carrinho[i].precoProdutos;
        }
        return total;
    }

	finalizarPedido(restaurante) {
        return restaurante.tipoUsuario.adicionarPedido(this.carrinho)
	}

    cancelarPedido(restaurante){
        restaurante.tipoUsuario.pedidoCancelado(this.cpf)
    }

    confirmarEntrega(confirmacao){
        if(confirmacao){
            console.log('Pedido entregue')
            this.limparCarrinho()
        } else{
            console.log('Pedido não foi entregue')
        }
    }
	
}

class produtosCarrinho {
    static contador = 0
    constructor(produto, quantidade,precoUnitario,precoProdutos){
        this.produto=produto
        this.quantidade=quantidade
        this.precoUnitario=precoUnitario
        this.precoProdutos=precoProdutos
        this.id= ++produtosCarrinho.contador
        // 
    }
}

module.exports = Cliente;