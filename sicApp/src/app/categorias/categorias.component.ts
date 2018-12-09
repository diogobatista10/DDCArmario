import { Component, OnInit } from '@angular/core';

import { Categoria } from '../model/categoria';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  encomendas: Categoria[];

  constructor(private encomendaService: CategoriaService) { }

  ngOnInit() {
    this.getCategorias();
  }

  getCategorias(): void {
    this.encomendaService.getCategorias()
      .subscribe(encomendas => this.encomendas = encomendas);
  }
  add(nome: string): void {

    if (!nome) { return; }
    this.encomendaService.addCategoria({ nome } as Categoria)
      .subscribe(encomenda => {
        this.encomendas.push(encomenda);
      });
  }
  delete(encomenda: Categoria): void {
    this.encomendas = this.encomendas.filter(h => h !== encomenda);
    this.encomendaService.deleteCategoria(encomenda).subscribe();
  }
}
