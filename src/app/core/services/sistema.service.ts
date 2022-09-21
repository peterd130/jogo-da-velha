import { Injectable } from '@angular/core';
import { ArvoreJogadasClass } from '../models/arvore-jogadas-class.model';
import { NodoClass } from '../models/nodo-class.model';
import { JogoService } from './jogo.service';

@Injectable({
  providedIn: 'root'
})
export class SistemaService {

  arvoreJogadas: NodoClass
  jogadaAtual: NodoClass

  constructor(private jogoService: JogoService) {
    this.arvoreJogadas = new ArvoreJogadasClass().getArvore()
    this.jogadaAtual = this.arvoreJogadas
    
    this.jogoService.turnoAtualValor$.subscribe((turnoAtual) => {
      if (turnoAtual && turnoAtual.id === 0) {
        setTimeout(() => {
          let pos = this.selecionaJogada(turnoAtual)
          this.jogoService.atualizaJogo(pos[0]!, pos[1]!)
        }, 1000)
      } else if (!turnoAtual) {
        this.jogadaAtual = this.arvoreJogadas
      }
    })
  }

  private selecionaJogada (turnoAtual: any) {
    this.atualizaUltimaJogada()

    if (turnoAtual.simbolo === 'x') {
      this.jogadaAtual = this.jogadaAtual.getFilhos().reduce(
        (prev, current) => (+prev.getUtilidade()! > +current.getUtilidade()!) ? prev : current
      )
      return [this.jogadaAtual.getPosI(), this.jogadaAtual.getPosJ()]
    }

    this.jogadaAtual = this.jogadaAtual.getFilhos().reduce(
      (prev, current) => (+prev.getUtilidade()! < +current.getUtilidade()!) ? prev : current
    )
    return [this.jogadaAtual.getPosI(), this.jogadaAtual.getPosJ()]
    
  }

  private atualizaUltimaJogada () {
    if (this.jogoService.ultimaJogada.posI !== null && this.jogoService.ultimaJogada.posJ !== null)
      this.jogadaAtual = this.jogadaAtual.getFilhos().find(
        j => j.getPosI() === this.jogoService.ultimaJogada.posI && j.getPosJ() === this.jogoService.ultimaJogada.posJ
      )!
  }
}
