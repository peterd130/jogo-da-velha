import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class JogoService {

  tabuleiro: Array<Array<null | string>> = [[null, null, null], [null, null, null] , [null, null, null]] 
  jogadores: any = [
    {nome: 'Sistema', simbolo: null, id: 0, vitorias: 0},
    {nome: 'Você', simbolo: null, id: 1, vitorias: 0}
  ]
  turnoAtual: any = null
  fimDeJogo: string | null = null
  ultimaJogada: any = {posI: null, posJ: null}

  private turnoAtual$ = new BehaviorSubject<any>(null)
  turnoAtualValor$ = this.turnoAtual$.asObservable()

  constructor() {
    this.turnoAtualValor$.subscribe((turnoAtual) => {
      this.turnoAtual = turnoAtual
    })
    this.sorteiaSimbolos()
  }

  novoJogo () {
    this.tabuleiro= [[null, null, null], [null, null, null] , [null, null, null]]
    this.fimDeJogo = null
    this.setTurnoAtual(0)
    this.ultimaJogada = {posI: null, posJ: null}
    this.sorteiaSimbolos()
  }

  atualizaJogo (posI: number, posJ: number) {
    this.tabuleiro[posI][posJ] = this.turnoAtual.simbolo
    this.ultimaJogada.posI = posI
    this.ultimaJogada.posJ = posJ
    let estadoJogo = this.verificaFimDeJogo()
    if (estadoJogo) {
      this.fimDeJogo = estadoJogo
      this.contabilizaVitoria()
    } else {
      this.mudaTurno()
    }
  }

  private contabilizaVitoria() {
    if (this.fimDeJogo !== 'empate') {
      let vencedor = this.jogadores.find((j: { simbolo: string }) => j.simbolo === this.turnoAtual.simbolo)
      vencedor.vitorias ++
    }
  }

  private verificaFimDeJogo () {
    for (let i = 0; i < 3; i ++) {
      if (this.tabuleiro[i][0] !== null && this.tabuleiro[i][0] === this.tabuleiro[i][1] && this.tabuleiro[i][0] === this.tabuleiro[i][2])
        return this.tabuleiro[i][0]
    }

    for (let j = 0; j < 3; j ++) {
      if (this.tabuleiro[0][j] !== null && this.tabuleiro[0][j] === this.tabuleiro[1][j] && this.tabuleiro[0][j] === this.tabuleiro[2][j])
        return this.tabuleiro[0][j]
    }

    if (this.tabuleiro[0][0] !== null && this.tabuleiro[0][0] === this.tabuleiro[1][1] && this.tabuleiro[0][0] === this.tabuleiro[2][2])
      return this.tabuleiro[0][0]

    if (this.tabuleiro[0][2] !== null && this.tabuleiro[0][2] === this.tabuleiro[1][1] && this.tabuleiro[0][2] === this.tabuleiro[2][0])
      return this.tabuleiro[0][2]

    if (this.tabuleiro.filter(a => !a.includes(null)).length === 3)
      return 'empate'

    return null
  }

  private sorteiaSimbolos () {
    let numero = Math.floor(Math.random() * 2)
    if (numero === 0) {
      this.jogadores[0].simbolo = 'x'
      this.jogadores[1].simbolo = 'o'
      this.setTurnoAtual(this.jogadores[0])
    } else {
      this.jogadores[0].simbolo = 'o'
      this.jogadores[1].simbolo = 'x'
      this.setTurnoAtual(this.jogadores[1])
    }
  }

  private setTurnoAtual (turno: any) {
    this.turnoAtual$.next(turno)
  }

  private mudaTurno () {
    if (this.turnoAtual.simbolo === 'x')
      this.setTurnoAtual(this.jogadores.find((j: { simbolo: string }) => j.simbolo === 'o'))
    else
      this.setTurnoAtual(this.jogadores.find((j: { simbolo: string }) => j.simbolo === 'x'))
  }
}
