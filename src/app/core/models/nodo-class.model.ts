export class NodoClass {
  private tabuleiro: Array<Array<string | null>>
  private filhos: Array<NodoClass>
  private utilidade: number | undefined
  private posI: number | undefined
  private posJ: number | undefined

  constructor() {
    this.tabuleiro = [[], [], []]
    this.filhos = []
    this.utilidade = undefined
    this.posI = undefined
    this.posJ = undefined
  }

  inicializaTabuleiroRaiz() {
    for (let i = 0; i < 3; i ++) {
      for (let j = 0; j < 3; j ++) {
        this.tabuleiro[i][j] = null
      }
    }
  }

  adicionaFilho (filho: NodoClass) {
    this.filhos.push(filho)
  }

  atualizaTabuleiro (posI: number, posJ: number, simbolo: string) {
    this.tabuleiro[posI][posJ] = simbolo
  }

  getFilhos () {
    return this.filhos
  }

  getTabuleiro () {
    return this.tabuleiro
  }

  setTabuleiro (tabuleiro: Array<Array<string | null>>) {
    this.tabuleiro = JSON.parse(JSON.stringify(tabuleiro))
  }

  getUtilidade () {
    return this.utilidade
  }

  setUtilidade (utilidade: number) {
    this.utilidade = utilidade
  }

  setPosI (posI: number) {
    this.posI = posI
  }

  getPosI () {
    return this.posI
  }

  getPosJ () {
    return this.posJ
  }

  setPosJ (posJ: number) {
    this.posJ = posJ
  }
}
