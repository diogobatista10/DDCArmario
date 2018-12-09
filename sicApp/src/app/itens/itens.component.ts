import { Component, OnInit } from '@angular/core';

import { Produto } from '../model/produto';
import { ItemService } from '../services/item.service';

import { Item } from '../model/item';
@Component({
  selector: 'app-itens',
  templateUrl: './itens.component.html',
  styleUrls: ['./itens.component.css']
})
export class ItensComponent implements OnInit {
  itens: Item[];

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.getItens();
 
  }

  getItens(): void {
    this.itemService.getItens()
      .subscribe(itens => this.itens = itens);
  }
  add(produto: Produto): void {

    if (!produto) { return; }
    this.itemService.addItem({ produto } as Item)
      .subscribe(item => {
        this.itens.push(item);
      });
  }
  delete(item: Item): void {
    this.itens = this.itens.filter(h => h !== item);
    this.itemService.deleteItem(item).subscribe();
  }
}
