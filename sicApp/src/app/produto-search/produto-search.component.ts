import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Produto } from '../model/produto';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-produto-search',
  templateUrl: './produto-search.component.html',
  styleUrls: ['./produto-search.component.css']
})
export class ProdutoSearchComponent implements OnInit {
  produtos$: Observable<Produto[]>;
  private searchTerms = new Subject<string>();

  constructor(private produtoService: ProdutoService) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.produtos$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.produtoService.searchProdutos(term)),
    );
  }
}
