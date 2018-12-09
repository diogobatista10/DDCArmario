import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Produto } from '../model/produto';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const produtos = [
      { id: 1, name: 'Armário de Cozinha', composto: false  },
      { id: 2, name: 'Aparador', composto: false  },
      { id: 3, name: 'Cristaleira', composto: false },
      { id: 4, name: 'Armário de Sala', composto: false  },
      { id: 5, name: 'Armário Cerejeira', composto: false  },
      { id: 6, name: 'Armário de Hall', composto: false },
  
    ];
    return { produtos };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(produtos: Produto[]): number {
    return produtos.length > 0 ? Math.max(...produtos.map(produto => produto.id)) + 1 : 11;
  }
}
