import { Component, OnInit } from '@angular/core';
import { JogoService } from '../services/jogo.service';
import { SistemaService } from '../services/sistema.service';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.sass']
})
export class JogoComponent implements OnInit {
  
  turnoAtualId: number | null = null

  constructor(private jogoService: JogoService, private sistemaService: SistemaService) {
    this.jogoService.turnoAtualValor$.subscribe((turnoAtual) => {
      this.turnoAtualId = turnoAtual.id
    })
  }

  ngOnInit(): void {
  }

  tabuleiroAtual () {
    return this.jogoService.tabuleiro
  }

  fimDeJogo () {
    if (this.jogoService.fimDeJogo) {
      if (this.jogoService.fimDeJogo === 'empate')
        return 'Empate'
      if (this.turnoAtualId === 1)
        return 'Você venceu!'
      return 'Vitória do sistema'
    }
    return null
  }

  podeRealizarJogada(i: number, j: number) {
    return this.turnoAtualId === 1 && this.fimDeJogo() === null && this.jogoService.tabuleiro[i][j] === null
  }

  realizaJogada(i: number, j: number) {
    if (this.podeRealizarJogada(i, j))
      this.jogoService.atualizaJogo(i, j)
  }

  imagens (simbolo: string | null) {
    if (simbolo) {
      if (simbolo === 'x')
        return "assets/imagens/x.svg"
      else
        return "assets/imagens/o.svg"
    }
    return null
  }

  reiniaJogo () {
    this.jogoService.novoJogo()
  }

  dadosJogadorSistema () {
    return this.jogoService.jogadores[0]
  }

  dadosJogadorHumano () {
    return this.jogoService.jogadores[1]
  }

}
