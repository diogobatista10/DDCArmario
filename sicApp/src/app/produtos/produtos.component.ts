import { Component, OnInit } from '@angular/core';

import { Produto } from '../model/produto';
import { Acabamento } from '../model/Acabamento';
import { Material } from '../model/Material';
import { Categoria } from '../model/Categoria';
import { ProdutoService } from '../services/produto.service';
import { MaterialService } from '../services/material.service';
import { CategoriaService } from '../services/categoria.service';
import { AcabamentoService } from '../services/acabamento.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {
  produtos: Produto[];
  acabamentos: Acabamento[];
  categorias: Categoria[];
  materiais: Material[];

  constructor(private produtoService: ProdutoService, private acabamentoService: AcabamentoService,
    private categoriaService: CategoriaService, private materialService: MaterialService) { }

  ngOnInit() {
    this.getProdutos();
    this.acabamentoService.getAcabamentos().subscribe(acabamentos => this.acabamentos = acabamentos);
    this.categoriaService.getCategorias().subscribe(categorias => this.categorias = categorias);
    this.materialService.getMateriais().subscribe(materiais => this.materiais = materiais);
  }

  getProdutos(): void {
    this.produtoService.getProdutos()
      .subscribe(produtos => this.produtos = produtos);
  }
  add(nome: string): void {
    nome = nome.trim();
    if (!name) { return; }
    this.produtoService.addProduto({ nome } as Produto)
      .subscribe(produto => {
        this.produtos.push(produto);
      });
  }
  delete(produto: Produto): void {
    this.produtos = this.produtos.filter(h => h !== produto);
    this.produtoService.deleteProduto(produto).subscribe();
  }
}
