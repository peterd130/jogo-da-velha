import { NodoClass } from "./nodo-class.model"

export class ArvoreJogadasClass {

  private raiz: NodoClass

  constructor() {
    this.raiz = new NodoClass()
    this.raiz.inicializaTabuleiroRaiz()
    this.geraArvore()
  }

  geraArvore () {
    let nodos = [{nodo: this.raiz, posPai: -1}]

    for (let l = 0; l < nodos.length; l ++) {
      let nodoTabuleiro = nodos[l].nodo.getTabuleiro()
      let resultado = this.verificaFimDeJogo (nodos[l].nodo.getTabuleiro())

      if (resultado !== null){
        if (resultado === 'x')
          nodos[l].nodo.setUtilidade(1)
        else if (resultado === 'o')
          nodos[l].nodo.setUtilidade(-1)
        else
          nodos[l].nodo.setUtilidade(0)
      } else {
        for (let i = 0; i < 3; i ++) {
          for (let j = 0; j < 3; j ++) {
            if (nodoTabuleiro[i][j] === null) {
              let novoNodo = new NodoClass()
              novoNodo.setTabuleiro(nodoTabuleiro)
              novoNodo.atualizaTabuleiro(i, j, this.determinaSimbolo(nodos[l].nodo))
              novoNodo.setPosI(i)
              novoNodo.setPosJ(j)
              nodos[l].nodo.adicionaFilho(novoNodo)
              nodos.push({nodo: novoNodo, posPai: l})
            }
          }
        }
      }
    }
    this.minimax(nodos)
  }

  determinaSimbolo(nodoPai: NodoClass) {
    let i = nodoPai.getPosI()
    let j = nodoPai.getPosJ()
    let tabuleiro = nodoPai.getTabuleiro()

    if (i !== undefined && j !== undefined && tabuleiro[i][j] === 'x')
      return 'o'
    return 'x'
  }

  verificaFimDeJogo (tabuleiro: Array<Array<string | null>>) {

    for (let i = 0; i < 3; i ++) {
      if (tabuleiro[i][0] !== null && tabuleiro[i][0] === tabuleiro[i][1] && tabuleiro[i][0] === tabuleiro[i][2])
        return tabuleiro[i][0]
    }

    for (let j = 0; j < 3; j ++) {
      if (tabuleiro[0][j] !== null && tabuleiro[0][j] === tabuleiro[1][j] && tabuleiro[0][j] === tabuleiro[2][j])
        return tabuleiro[0][j]
    }

    if (tabuleiro[0][0] !== null && tabuleiro[0][0] === tabuleiro[1][1] && tabuleiro[0][0] === tabuleiro[2][2])
      return tabuleiro[0][0]

    if (tabuleiro[0][2] !== null && tabuleiro[0][2] === tabuleiro[1][1] && tabuleiro[0][2] === tabuleiro[2][0])
      return tabuleiro[0][2]

    if (tabuleiro.filter(a => !a.includes(null)).length === 3)
      return 0

    return null

  }

  minimax (nodos: Array<{nodo: NodoClass, posPai: number}>) {
    for (let i = nodos.length - 1; i > 0; i --) {
      let pai = nodos[nodos[i].posPai].nodo
      let utilidadePai = pai.getUtilidade()
      let utilidade = nodos[i].nodo.getUtilidade()
      let movimentoAtual = nodos[i].nodo.getTabuleiro()[nodos[i].nodo.getPosI()!][nodos[i].nodo.getPosJ()!]

      if (utilidadePai === undefined ||
        (utilidadePai !== undefined && 
          ((movimentoAtual === 'x' && utilidade! > utilidadePai) || 
          (movimentoAtual === 'o' && utilidade! < utilidadePai))
        ))
        pai.setUtilidade(utilidade!)
    }

  }

  getArvore() {
    return this.raiz
  }
}
