import { Component, OnInit } from '@angular/core';

import { Acabamento } from '../model/acabamento';
import { AcabamentoService } from '../services/acabamento.service';

@Component({
  selector: 'app-acabamentos',
  templateUrl: './acabamentos.component.html',
  styleUrls: ['./acabamentos.component.css']
})
export class AcabamentosComponent implements OnInit {
  acabamentos: Acabamento[];

  constructor(private acabamentoService: AcabamentoService) { }

  ngOnInit() {
    this.getAcabamentos();
  }

  getAcabamentos(): void {
    this.acabamentoService.getAcabamentos()
      .subscribe(acabamentos => this.acabamentos = acabamentos);
  }
  add(nome: string): void {
    nome = nome.trim();
    if (!nome) { return; }
    this.acabamentoService.addAcabamento({ nome } as Acabamento)
      .subscribe(acabamento => {
        this.acabamentos.push(acabamento);
      });
  }
  delete(acabamento: Acabamento): void {
    this.acabamentos = this.acabamentos.filter(h => h !== acabamento);
    this.acabamentoService.deleteAcabamento(acabamento).subscribe();
  }
}
