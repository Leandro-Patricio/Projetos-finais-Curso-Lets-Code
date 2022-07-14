import { useState, useEffect, useRef } from "react";
import "./styles.css";
import { listaCompletaDeHerois } from "./lista_herois";

export default function App() {
  // mensagens iniciais
  const [divPrimeiroNome, setDivPrimeiroNome] = useState(true);
  const [divSegundoNome, setDivSegundoNome] = useState(false);
  const [msgErroNomeIgual, setMsgErroNomeIgual] = useState(false);
  const [msgErroNomeNaoSelecionado, setMsgErroNomeNaoSelecionado] = useState(
    false
  );
  const [msgErroHeroiNaoSelecionado, setMsgErroHeroiNaoSelecionado] = useState(
    false
  );
  const [
    msgConfirmacaoInicialDoJogador,
    setMsgConfirmacaoInicialDoJogador
  ] = useState(false);
  const [
    msgConfirmacaoInicialDoJogador2,
    setMsgConfirmacaoInicialDoJogador2
  ] = useState(false);
  const [tabuleiroInicial, setTabuleiroInicial] = useState(true);

  // características iniciais
  const [primeiroNome, setPrimeiroNome] = useState("");
  const [primeiroNomeTemp, setPrimeiroNomeTemp] = useState("");
  const [segundoNome, setSegundoNome] = useState("");
  const [segundoNomeTemp, setSegundoNomeTemp] = useState("");
  const [primeiroHeroi, setPrimeiroHeroi] = useState("");
  const [primeiroHeroiTemp, setPrimeiroHeroiTemp] = useState("");
  const [segundoHeroi, setSegundoHeroi] = useState("");
  const [segundoHeroiTemp, setSegundoHeroiTemp] = useState("");

  // começando o jogo
  const [regras, setRegras] = useState(false);
  const [proximoJogador, setProximoJogador] = useState(false);
  const [jogadorDaVez, setJogadorDaVez] = useState(1);
  const [caracteristicaDoTurno, setCaracteristicaDoTurno] = useState("");

  // main game

  // jogador 1
  const [divTurnoPlayer1, setDivTurnoPlayer1] = useState(false);
  const [heroisPlayer1, setHeroisPlayer1] = useState(listaCompletaDeHerois);
  const [imgHeroiEscolhido1, setImgHeroiEscolhido1] = useState(false);
  const [
    caracteristicasEscolhidasJogador1,
    setCaracteristicasEscolhidasJogador1
  ] = useState([]);

  //player 2
  const [divTurnoPlayer2, setDivTurnoPlayer2] = useState(false);
  const [heroisPlayer2, setHeroisPlayer2] = useState(listaCompletaDeHerois);
  const [
    caracteristicasEscolhidasJogador2,
    setCaracteristicasEscolhidasJogador2
  ] = useState([]);
  const [imgHeroiEscolhido2, setImgHeroiEscolhido2] = useState(false);

  // finalizando o jogo
  const [divChute, setDivChute] = useState(false);
  const [divVitoria, setDivVitoria] = useState(false);
  const [divDerrota, setDivDerrota] = useState(false);
  const [chuteHeroi, setChuteHeroi] = useState("");
  const [objChuteHeroi, setObjChuteHeroi] = useState("a");
  const [jogadorQEstaChutando, setJogadorQEstaChutando] = useState("");
  const [vitoria, setVitoria] = useState("");

  const inserirHeroi = (e) => {
    if (primeiroNomeTemp === "") {
      setMsgErroNomeNaoSelecionado(true);
      setMsgConfirmacaoInicialDoJogador(false);
    } else if (primeiroHeroi === "") {
      setMsgErroNomeIgual(false);
      setMsgErroNomeNaoSelecionado(false);
      setPrimeiroNome(primeiroNomeTemp);
      setPrimeiroHeroiTemp(e.target.id);
      setMsgConfirmacaoInicialDoJogador(true);
    } else if (segundoNomeTemp === "") {
      setMsgErroNomeNaoSelecionado(true);
      setMsgErroNomeIgual(false);
      setMsgConfirmacaoInicialDoJogador2(false);
    } else if (segundoNomeTemp === primeiroNome) {
      setMsgErroNomeNaoSelecionado(false);
      setMsgErroNomeIgual(true);
      setMsgConfirmacaoInicialDoJogador2(false);
    } else {
      setSegundoNome(segundoNomeTemp);
      setMsgErroHeroiNaoSelecionado(false);
      setMsgErroNomeNaoSelecionado(false);
      setMsgErroNomeIgual(false);
      setMsgConfirmacaoInicialDoJogador2(true);
      setSegundoHeroiTemp(e.target.id);
    }
  };

  const confirmarPrimeiroHeroi = () => {
    setDivPrimeiroNome(false);
    setDivSegundoNome(true);
    setMsgConfirmacaoInicialDoJogador(false);
    setMsgErroHeroiNaoSelecionado(false);
    setMsgErroNomeNaoSelecionado(false);
    setPrimeiroHeroi(
      listaCompletaDeHerois.find((heroi) => heroi.heroi === primeiroHeroiTemp)
    );
  };

  const confirmarSegundoHeroi = () => {
    setMsgErroNomeIgual(false);
    setMsgErroHeroiNaoSelecionado(false);
    setMsgConfirmacaoInicialDoJogador2(false);
    setSegundoHeroi(
      listaCompletaDeHerois.find((heroi) => heroi.heroi === segundoHeroiTemp)
    );
    setMsgConfirmacaoInicialDoJogador2(false);
    setTabuleiroInicial(false);
    setDivSegundoNome(false);
    /*continuação*/
    setRegras(true);
    
  };

  const turnoPlayer1 = () => {
    setRegras(false);
    setDivTurnoPlayer1(true);
  };

  const filtrarCaracteristica = () => {
    if (segundoHeroi.caracteristica.indexOf(caracteristicaDoTurno) !== -1) {
      /*Ou seja, o herói escolhido tem a característica*/
      const filtro = heroisPlayer1.filter((heroi) =>
        heroi.caracteristica.some(
          (caracteristica) => caracteristica === caracteristicaDoTurno
        )
      );
      setHeroisPlayer1(filtro);
      const carac = { caracteristica: caracteristicaDoTurno, acerto: true };
      setCaracteristicasEscolhidasJogador1([
        ...caracteristicasEscolhidasJogador1,
        carac
      ]);
    } else if (
      segundoHeroi.caracteristica.indexOf(caracteristicaDoTurno) === -1
    ) {
      /*Ou seja, o herói escolhido não tem a característica*/
      const filtro = heroisPlayer1.filter(
        (heroi) => heroi.caracteristica.indexOf(caracteristicaDoTurno) === -1
      );
      setHeroisPlayer1(filtro);
      const carac = { caracteristica: caracteristicaDoTurno, acerto: false };
      setCaracteristicasEscolhidasJogador1([
        ...caracteristicasEscolhidasJogador1,
        carac
      ]);
    }

    setDivTurnoPlayer1(false);
    setProximoJogador(true);
  };

  const filtrarCaracteristicaI = () => {
    if (primeiroHeroi.caracteristica.indexOf(caracteristicaDoTurno) !== -1) {
      /*Ou seja, o herói escolhido tem a característica*/
      const filtro = heroisPlayer2.filter((heroi) =>
        heroi.caracteristica.some(
          (caracteristica) => caracteristica === caracteristicaDoTurno
        )
      );
      setHeroisPlayer2(filtro);
      const carac = { caracteristica: caracteristicaDoTurno, acerto: true };
      setCaracteristicasEscolhidasJogador2([
        ...caracteristicasEscolhidasJogador2,
        carac
      ]);
    } else if (
      primeiroHeroi.caracteristica.indexOf(caracteristicaDoTurno) === -1
    ) {
      /*Ou seja, o herói escolhido não tem a característica*/
      const filtro = heroisPlayer2.filter(
        (heroi) => heroi.caracteristica.indexOf(caracteristicaDoTurno) === -1
      );
      setHeroisPlayer2(filtro);
      const carac = { caracteristica: caracteristicaDoTurno, acerto: false };
      setCaracteristicasEscolhidasJogador2([
        ...caracteristicasEscolhidasJogador2,
        carac
      ]);
    }

    setDivTurnoPlayer2(false);
    setProximoJogador(true);
  };

  const showImgHeroi = () => {
    console.log(jogadorDaVez);
    if (jogadorDaVez === 1) {
      if (imgHeroiEscolhido1 === false) {
        setImgHeroiEscolhido1(true);
      } else {
        setImgHeroiEscolhido1(false);
      }
    } else if (jogadorDaVez === 2) {
      if (imgHeroiEscolhido2 === false) {
        setImgHeroiEscolhido2(true);
      } else {
        setImgHeroiEscolhido2(false);
      }
    }
  };

  const recomecoAQlqMomento = () => {
    window.location.reload(false);
  };

  const chutarHeroi = (e) => {
    setImgHeroiEscolhido1(false);
    setImgHeroiEscolhido2(false);
    setDivTurnoPlayer1(false);
    setDivTurnoPlayer2(false);
    setChuteHeroi(e.target.id);
    setObjChuteHeroi(
      listaCompletaDeHerois.find((x) => x.heroi === e.target.id)
    );
    setDivChute(true);
    if (jogadorDaVez === 1) {
      setJogadorQEstaChutando(primeiroNome);
    } else if (jogadorDaVez === 2) {
      setJogadorQEstaChutando(segundoNome);
    }
  };

  const voltar = () => {
    setDivTurnoPlayer1(true);
    setProximoJogador(false);
  };

  const next = () => {
    setProximoJogador(false);
    if (jogadorDaVez === 1) {
      setJogadorDaVez(2);
      setDivTurnoPlayer2(true);
    } else if (jogadorDaVez === 2) {
      setJogadorDaVez(1);
      setDivTurnoPlayer1(true);
    }
  };

  const voltarAoJogadorDaVez = () => {
    setDivChute(false);
    if (jogadorDaVez === 1) {
      setDivTurnoPlayer1(true);
    } else if (jogadorDaVez === 2) {
      setDivTurnoPlayer2(true);
    }
  };

  const finalizarJogo = () => {
    setDivChute(false);
    if (jogadorDaVez === 1 && chuteHeroi === segundoHeroi.heroi) {
      setVitoria(true);
      setDivVitoria(true);
    } else if (jogadorDaVez === 1 && chuteHeroi !== segundoHeroi.heroi) {
      setVitoria(false);
      setDivDerrota(true);
    } else if (jogadorDaVez === 2 && chuteHeroi === primeiroHeroi.heroi) {
      setVitoria(true);
      setDivVitoria(true);
    } else if (jogadorDaVez === 2 && chuteHeroi !== primeiroHeroi.heroi) {
      setVitoria(false);
      setDivDerrota(true);
    }
  };

  //-------------------------------------------------------------

  return (
    <>
      <header className="header">
        <h1>Cara a Cara</h1>
        <h2>Modelo Marvel</h2>
        <h3>
          Será que você consegue adivinhar o personagem antes do outro jogador?
        </h3>
      </header>

      {/* Estabelece o nome dos jogadores*/}
      <div>
        <div style={{ display: divPrimeiroNome ? "block" : "none" }}>
          Para começar, vamos decidir quem vai jogar. Qual o nome do primiero
          jogador?
          <input
            style={{ marginLeft: "10px" }}
            placeholder="Jogador 1"
            value={primeiroNomeTemp}
            onChange={(e) => setPrimeiroNomeTemp(e.target.value)}
          />
          <p>E depois escolha o seu herói ou heroina:</p>
        </div>

        <div style={{ display: divSegundoNome ? "block" : "none" }}>
          Agora, e quem desafiará {primeiroNome}?
          <input
            style={{ marginLeft: "10px" }}
            placeholder="Jogador 2"
            value={segundoNomeTemp}
            onChange={(e) => setSegundoNomeTemp(e.target.value)}
          />
          <p>E depois escolha o seu herói ou heroina:</p>
        </div>

        {/* mensagens de erro*/}
        <div
          style={{
            display: msgErroNomeNaoSelecionado ? "block" : "none",
            color: "red"
          }}
        >
          Insira um nome válido. Pode ser qualquer um, vai... E depois de
          escrever seu nick, escolha um herói de novo.
        </div>
        <div
          style={{ display: msgErroNomeIgual ? "block" : "none", color: "red" }}
        >
          Que falta de criatividade. Insira um nome diferente...
        </div>
        <div
          style={{
            display: msgErroHeroiNaoSelecionado ? "block" : "none",
            color: "red"
          }}
        >
          Não gostou de nenhum? Escolhe um herói só...
        </div>
      </div>

      {/* mensagens de confirmação */}
      <div
        style={{ display: msgConfirmacaoInicialDoJogador ? "block" : "none" }}
      >
        Você, {primeiroNome}, confirma a sua escolha de {primeiroHeroiTemp}?
        <button
          onClick={() => confirmarPrimeiroHeroi()}
          className="confirmacaoInicial"
        >
          Sim! Vai que vai!
        </button>
      </div>

      <div
        style={{ display: msgConfirmacaoInicialDoJogador2 ? "block" : "none" }}
      >
        {segundoNome}, pronto para o desafio? Você confirma a sua escolha de{" "}
        {segundoHeroiTemp}?
        <button
          onClick={() => confirmarSegundoHeroi()}
          className="confirmacaoInicial"
        >
          Eu não vou perder!
        </button>
      </div>

      <section style={{ display: tabuleiroInicial ? "block" : "none" }}>
        <div className="tabuleiro">
          {listaCompletaDeHerois.map((heroi) => (
            <>
              <div
                className="imgHero"
                id={heroi.heroi}
                onClick={(e) => {
                  inserirHeroi(e);
                }}
                style={{ backgroundImage: `url(${heroi.link})` }}
              >
                <div className="nomeHeroi">{heroi.heroi}</div>
                
              </div>
            </>
          ))}
        </div>
      </section>

      <section>
        <div className="regras" style={{ display: regras ? "block" : "none" }}>
          <h3>
            Olá desafiantes {primeiroNome} e {segundoNome}. Estão prontos para
            este duelo emocionante?
          </h3>
          <h4>
            As regras são simples. O seu objetivo é adivinhar o herói ou heroina
            que o seu adversário escolheu. Quem adivinhar primiero, ganha!
          </h4>
          <br />
          <p className="pRegras">
            Para isso, você pode fazer duas coisas: escolher uma característica
            ou diretamente um herói. Ao escolher uma característica, você
            aumenta as suas chances de acertar na próxima rodada, mas passa a
            vez para o seu adversário. Já a escolha do herói é tudo ou nada. Se
            você acertar, todos os espólios para você, além de um passe-livre
            para zuar seu incapaz oponente. Maaaassssss, caso erre, você perde
            imediatamente o jogo. Então cuidado com as suas escolhas e pensa bem
            antes.
          </p>
          <p>
            <button onClick={() => turnoPlayer1()}>
              Prontos para o desafio? Clique aqui para começar esta disputa
              incrível!
            </button>
          </p>
          <img
            src="https://www.desktopbackground.org/p/2012/08/28/443783_popular-marvel-heroes-wallpaper-buy-cheap-marvel-heroes-wallpapers_1000x657_h.jpg"
            style={{ width: "100%" }}
            alt="herois marvel"
          />
        </div>
      </section>

      <main>
        <div
          className="telaJogador1"
          style={{ display: divTurnoPlayer1 ? "block" : "none" }}
        >
          Agora é a vez de {primeiroNome}. Escolha uma categoria, ou então tente
          a sorte clicando em um herói.
          <br />
          <form>
            <select
              value={caracteristicaDoTurno}
              onChange={(e) => setCaracteristicaDoTurno(e.target.value)}
            >
              <option disabled selected value="">
                {" "}
                -- Escolha uma característica --{" "}
              </option>
              <optgroup label="Gênero">
                <option value="feminino">Feminino</option>
                <option value="masculino">Masculino</option>
              </optgroup>
              <optgroup label="Traje">
                <option value="traje azul">Traje azul</option>
                <option value="traje vermelho">Traje vermelho</option>
                <option value="traje amarelo">Traje amarelo</option>
                <option value="traje preto">Traje preto</option>
                <option value="traje branco">Traje branco</option>
              </optgroup>
              <optgroup label="Cabelo">
                <option value="cabelo castanho">Cabelo castanho</option>
                <option value="cabelo branco">Cabelo branco</option>
                <option value="cabelo loiro">Cabelo loiro</option>
                <option value="cabelo vermelho">Cabelo vermelho</option>
                <option value="cabelo preto">Cabelo preto</option>
              </optgroup>
              <optgroup label="Máscara">
                <option value="sem capacete/mascara">
                  Sem máscara/capacete
                </option>
                <option value="com capacete/mascara">
                  Com máscara/capacete
                </option>
              </optgroup>
              <optgroup label="Forma de luta">
                <option value="poder/mutação">Poder/Mutação</option>
                <option value="sem arma">Sem arma</option>
                <option value="acessorio/arma">Com acessório/arma</option>
              </optgroup>
            </select>
            <button type="button" onClick={() => filtrarCaracteristica()}>
              Selecionar
            </button>
          </form>
          <p>
            <form>
              <ul className="listaCaracteristicasEscolhidasJogador">
                {caracteristicasEscolhidasJogador1.map((x) => (
                  <li
                    className={
                      x.acerto
                        ? "caracteristicasEscolhidasJogadorAcerto"
                        : "caracteristicasEscolhidasJogadorErro"
                    }
                  >
                    {x.caracteristica}
                  </li>
                ))}
              </ul>
            </form>
          </p>
          <p>
            Abaixo encontram-se os personagens que você pode escolher para
            adivinhar, ou seja, aqueles que ainda não foram excluídos das
            categorias previamente escolhidas. Clique em alguém para chutar um
            herói.
          </p>
          <div className="tabuleiro">
            {heroisPlayer1.map((heroi) => (
              <>
                <div
                  className="imgHero"
                  id={heroi.heroi}
                  onClick={(e) => {
                    chutarHeroi(e);
                  }}
                  style={{ backgroundImage: `url(${heroi.link})` }}
                >
                  <div className="nomeHeroi">{heroi.heroi}</div>
                  <span className="caracteristicaNoTabuleiro">
                    {heroi.caracteristica.map((caracteristica)=>
                      <> <div> {caracteristica} </div> </>
                      )}
                    </span>
                </div>
              </>
            ))}
          </div>
          <div className="personagemEscolhido">
            <p>
              <button onClick={() => showImgHeroi()}>
                Não se lembra qual personagem escolheu? Clique aqui e relembre!
                Obs: Fale pro seu adversário não olhar
                <br />
                <img
                  src="https://i.pinimg.com/originals/b1/91/41/b1914162ed994b654e3dbd7c04c92d33.jpg"
                  alt="to de olho"
                  style={{ width: "50px", height: "50px" }}
                />
              </button>
            </p>
            <div
              className="imgHero"
              style={{
                backgroundImage: `url(${primeiroHeroi.link})`,
                display: imgHeroiEscolhido1 ? "block" : "none"
              }}
            >
              <div className="nomeHeroi">{primeiroHeroi.heroi}</div>
            </div>
          </div>
        </div>

        <div
          className="telaJogador2"
          style={{ display: divTurnoPlayer2 ? "block" : "none" }}
        >
          Agora é a vez de {segundoNome}. Escolha uma categoria, ou então tente
          a sorte clicando em um herói.
          <br />
          <form>
            <select
              value={caracteristicaDoTurno}
              onChange={(e) => setCaracteristicaDoTurno(e.target.value)}
            >
              <option disabled selected value="">
                {" "}
                -- Escolha uma característica --{" "}
              </option>
              <optgroup label="Gênero">
                <option value="feminino">Feminino</option>
                <option value="masculino">Masculino</option>
              </optgroup>
              <optgroup label="Traje">
                <option value="traje azul">Traje azul</option>
                <option value="traje vermelho">Traje vermelho</option>
                <option value="traje amarelo">Traje amarelo</option>
                <option value="traje preto">Traje preto</option>
                <option value="traje branco">Traje branco</option>
              </optgroup>
              <optgroup label="Cabelo">
                <option value="cabelo castanho">Cabelo castanho</option>
                <option value="cabelo branco">Cabelo branco</option>
                <option value="cabelo loiro">Cabelo loiro</option>
                <option value="cabelo vermelho">Cabelo vermelho</option>
                <option value="cabelo preto">Cabelo preto</option>
              </optgroup>
              <optgroup label="Máscara">
                <option value="sem capacete/mascara">
                  Sem máscara/capacete
                </option>
                <option value="com capacete/mascara">
                  Com máscara/capacete
                </option>
              </optgroup>
              <optgroup label="Forma de luta">
                <option value="poder/mutação">Poder/Mutação</option>
                <option value="sem arma">Sem arma</option>
                <option value="acessorio/arma">Com acessório/arma</option>
              </optgroup>
            </select>
            <button type="button" onClick={() => filtrarCaracteristicaI()}>
              Selecionar
            </button>
          </form>
          <p>
            <form>
              <ul className="listaCaracteristicasEscolhidasJogador">
                {caracteristicasEscolhidasJogador2.map((x) => (
                  <li
                    className={
                      x.acerto
                        ? "caracteristicasEscolhidasJogadorAcerto"
                        : "caracteristicasEscolhidasJogadorErro"
                    }
                  >
                    {x.caracteristica}
                  </li>
                ))}
              </ul>
            </form>
          </p>
          <p>
            Abaixo encontram-se os personagens que você pode escolher para
            adivinhar, ou seja, aqueles que ainda não foram excluídos das
            categorias previamente escolhidas. Clique em alguém para chutar um
            herói.
          </p>
          <div className="tabuleiro2">
            {heroisPlayer2.map((heroi) => (
              <>
                <div
                  className="imgHero"
                  id={heroi.heroi}
                  onClick={(e) => {
                    chutarHeroi(e);
                  }}
                  style={{ backgroundImage: `url(${heroi.link})` }}
                >
                  <div className="nomeHeroi">{heroi.heroi}</div>
                  <span className="caracteristicaNoTabuleiro">
                    {heroi.caracteristica.map((caracteristica)=>
                      <> <div> {caracteristica} </div> </>
                      )}
                    </span>
                </div>
              </>
            ))}
          </div>
          <div className="personagemEscolhido2">
            <p>
              <button onClick={() => showImgHeroi()}>
                Não se lembra qual personagem escolheu? Clique aqui e relembre!
                Obs: Fale pro seu adversário não olhar
                <br />
                <img
                  src="https://i.pinimg.com/originals/b1/91/41/b1914162ed994b654e3dbd7c04c92d33.jpg"
                  alt="to de olho"
                  style={{ width: "50px", height: "50px" }}
                />
              </button>
            </p>
            <div
              className="imgHero"
              style={{
                backgroundImage: `url(${segundoHeroi.link})`,
                display: imgHeroiEscolhido2 ? "block" : "none"
              }}
            >
              <div className="nomeHeroi">{segundoHeroi.heroi}</div>
            </div>
          </div>
        </div>
      </main>

      <section style={{ display: proximoJogador ? "block" : "none" }}>
        <p>Abaixo temos o tabuleiro do Jogador {jogadorDaVez} atualizado:</p>
        <div style={{ display: jogadorDaVez === 1 ? "block" : "none" }}>
          <p>
            <form>
              <ul className="listaCaracteristicasEscolhidasJogador">
                {caracteristicasEscolhidasJogador1.map((x) => (
                  <li
                    className={
                      x.acerto
                        ? "caracteristicasEscolhidasJogadorAcerto"
                        : "caracteristicasEscolhidasJogadorErro"
                    }
                  >
                    {x.caracteristica}
                  </li>
                ))}
              </ul>
            </form>
          </p>

          <div className="tabuleiro">
            {heroisPlayer1.map((heroi) => (
              <>
                <div
                  className="imgHero"
                  style={{ backgroundImage: `url(${heroi.link})` }}
                >
                  <div className="nomeHeroi">{heroi.heroi}</div>
                </div>
              </>
            ))}
          </div>
        </div>
        <div style={{ display: jogadorDaVez === 2 ? "block" : "none" }}>
          <p>
            <form>
              <ul className="listaCaracteristicasEscolhidasJogador">
                {caracteristicasEscolhidasJogador2.map((x) => (
                  <li
                    className={
                      x.acerto
                        ? "caracteristicasEscolhidasJogadorAcerto"
                        : "caracteristicasEscolhidasJogadorErro"
                    }
                  >
                    {x.caracteristica}
                  </li>
                ))}
              </ul>
            </form>
          </p>
          <div className="tabuleiro2">
            {heroisPlayer2.map((heroi) => (
              <>
                <div
                  className="imgHero"
                  style={{ backgroundImage: `url(${heroi.link})` }}
                >
                  <div className="nomeHeroi">{heroi.heroi}</div>
                </div>
              </>
            ))}
          </div>
        </div>
        
        <div>
          <button className="proximoJogador" onClick={() => next()}>Proximo Jogador</button>
          <br />
        </div>
      </section>

      <section>
        <div
          className="divChute"
          style={{ display: divChute ? "block" : "none" }}
        >
          <h2>{jogadorQEstaChutando}, você tem certeza que deseja chutar?</h2>
          <h3>
            Se aceitar, estará tudo acabado, pelas forças do bem ou do mal...
          </h3>
          <p>
            O seu chute é:
            <div
              className="imgHeroChute"
              style={{
                backgroundImage: `url(${objChuteHeroi.link})`
              }}
            >
              <div className="nomeHeroiChute">{objChuteHeroi.heroi}</div>
            </div>
          </p>
          Caso acerte, você terá o direito da glória eterna
          <span className="linhaNoMeio">
            {" "}
            bom, pelo menos até o próximo jogo.
          </span>
          <br />
          Caso erre, não haverá perdão. Poderás ser ridicularizado para todo o
          sempre.
          <p className="chuteFinal">
            <button
              className="botoesChuteFinal"
              onClick={() => voltarAoJogadorDaVez()}
            >
              Ainda não. Volte para filtrar outra característica
            </button>
            <button
              className="botoesChuteFinal"
              onClick={() => finalizarJogo()}
            >
              Sim! Eu tenho certeza! Hoje a vitória será minha!
            </button>
          </p>
        </div>
      </section>

      <section>
        <div style={{ display: divVitoria ? "block" : "none" }}>
          <h2>Parabéns! Você acertou!</h2>
          <h3>Depois de todo o esforço, a glória e os espólios</h3>
          <p>
            Pabarbéns {jogadorDaVez}! Você demonstrou como um verdaderiro herói
            deve fazer. Derrotou o seu adversário a tempo de tomar uma cerveja
            gelada
            <span className="linhaNoMeio"> paga por ele.</span>
          </p>

          <p className="chuteErro2Img">
            <div className="msgChuteErro">O seu chute foi:</div>
            <div
              className="imgHeroChute"
              style={{
                backgroundImage: `url(${objChuteHeroi.link})`
              }}
            >
              <div className="nomeHeroiChute">{objChuteHeroi.heroi}</div>
            </div>

            <div className="msgChuteErro">
              E o que o seu adversário escolheu foi:
            </div>
            <div
              className="imgHeroChute"
              style={{
                backgroundImage: `url(${
                  jogadorDaVez === 1 ? segundoHeroi.link : primeiroHeroi.link
                })`
              }}
            >
              <div className="nomeHeroiChute">
                {jogadorDaVez === 1 ? segundoHeroi.heroi : primeiroHeroi.heroi}
              </div>
            </div>
          </p>

          <h3>
            Mas não há tempo para descansar! O mal está a espreita. Clique no
            botão abaixo e vamos derrotá-los de novo!
          </h3>
        </div>
      </section>

      <section>
        <div
          style={{
            display: divDerrota ? "block" : "none",
            textAlign: "center"
          }}
        >
          <h2>Que horror! Você errou feio!</h2>
          <h3>Você nadou nadou... e morreu na praia.</h3>
          <p>
            Que vexame {jogadorDaVez}! As suas atitudes de herói foram pífias.
            Já pensou em trabalhar com os vilões, talvez você se desse melhor lá
            <span className="linhaNoMeio"> já que eles sempre perdem.</span>
          </p>

          <p className="chuteErro2Img">
            <div className="msgChuteErro">O seu chute foi:</div>
            <div
              className="imgHeroChute"
              style={{
                backgroundImage: `url(${objChuteHeroi.link})`
              }}
            >
              <div className="nomeHeroiChute">{objChuteHeroi.heroi}</div>
            </div>

            <div className="msgChuteErro">
              E o que o seu adversário escolheu foi:
            </div>
            <div
              className="imgHeroChute"
              style={{
                backgroundImage: `url(${
                  jogadorDaVez === 1 ? segundoHeroi.link : primeiroHeroi.link
                })`
              }}
            >
              <div className="nomeHeroiChute">
                {jogadorDaVez === 1 ? segundoHeroi.heroi : primeiroHeroi.heroi}
              </div>
            </div>
          </p>

          <h3>
            O bom da justiça é que ela sempre lhe dará uma segunda chance
            <span className="linhaNoMeio"> ou uma 3a, 4a.....</span>
            Não desanime e tente novamente clicando no botão abaixo!
          </h3>
        </div>
      </section>

      <p>
        {" "}
        <button
          className="recomecoAQlqMomento"
          onClick={() => recomecoAQlqMomento()}
        >
          Quer recomeçar o jogo a qualquer momento? Clique aqui!
        </button>{" "}
      </p>
    </>
  );
}
