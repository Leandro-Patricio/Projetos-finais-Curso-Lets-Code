
const CadastroUsuario = require("./CadastroUsuario");
const Cliente = require("./ClienteDaniel");
const Lojista = require("./LojistaDaniel");
// const pedidosParaEntregadores = require("./CadastroUsuario");
const Entregador = require("./EntregadorDaniel");

// const Cadastro = new listaCadastros()


const jessica = new CadastroUsuario("jess", "123", "cliente", "Jessica", "123456789", "987654321", "Rua XXX");

console.log(jessica);
// console.log(jessica.tipoUsuario);
jessica.tipoUsuario.login("jess", "123");

const florDoCampo = new CadastroUsuario("flor", "123", "lojista", "Flor do Campo", "789654130001", "789654123", "Rua YYY");

console.log(florDoCampo);
//console.log(florDoCampo.tipoUsuario);
florDoCampo.tipoUsuario.login("flor", "123");

florDoCampo.tipoUsuario.adicionarProduto("Arroz", 5);
florDoCampo.tipoUsuario.adicionarProduto("Feijão", 3);
florDoCampo.tipoUsuario.adicionarProduto("Batata Frita", 10);
florDoCampo.tipoUsuario.removerProduto("Arroz");
florDoCampo.tipoUsuario.adicionarProduto("Arroz", 5);
florDoCampo.tipoUsuario.editarProduto("Feijão", "preco", 7);

florDoCampo.tipoUsuario.mostrarCardapio();

jessica.tipoUsuario.addItem(florDoCampo.tipoUsuario.cardapio, "Arroz", 2);
jessica.tipoUsuario.addItem(florDoCampo.tipoUsuario.cardapio, "Feijão", 7);
jessica.tipoUsuario.addItem(florDoCampo.tipoUsuario.cardapio, "Batata Frita", 4);

jessica.tipoUsuario.visualizarPedido();

jessica.tipoUsuario.removerItem("Arroz");
jessica.tipoUsuario.visualizarPedido();

jessica.tipoUsuario.editarItem("Feijão",3);
jessica.tipoUsuario.visualizarPedido();

jessica.tipoUsuario.limparCarrinho();
jessica.tipoUsuario.visualizarPedido();

jessica.tipoUsuario.addItem(florDoCampo.tipoUsuario.cardapio, "Arroz", 2);
jessica.tipoUsuario.addItem(florDoCampo.tipoUsuario.cardapio, "Feijão", 7);

jessica.tipoUsuario.finalizarPedido(florDoCampo);


const mincho = new CadastroUsuario("mincho", "123", "entregador", "Mincho", "123456789", "987654321");
console.log(mincho)

florDoCampo.tipoUsuario.confirmarCarrinho(false,mincho)
florDoCampo.tipoUsuario.confirmarCarrinho(true,mincho)

mincho.tipoUsuario.verPedidosConfirmados()
// mincho.tipoUsuario.entregarPedido('123456789',florDoCampo)

// console.log(florDoCampo.tipoUsuario.pedidoCliente)

console.log("lista de pedidos do restaurante")
console.log(florDoCampo.tipoUsuario.pedidoCliente)
console.log("lista de pedidos já indo pra entrega")
console.log(florDoCampo.tipoUsuario.pedidosEntregues)

jessica.tipoUsuario.cancelarPedido(florDoCampo)







