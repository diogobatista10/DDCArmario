import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Item } from '../model/item';
import { MessageService } from './message.service';
import { Produto } from '../model/produto';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class ItemService {

  private produtosUrl = 'http://arqsiencomendas2018g09.azurewebsites.net/itens';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
  getItens(): Observable<Item[]> {
    return this.http.get<Item[]>(this.produtosUrl)
      .pipe(
        tap(_ => this.log('fetched itens')),
        catchError(this.handleError('getItens', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getItemNo404<Data>(id: number): Observable<Item> {
    const url = `${this.produtosUrl}/?id=${id}`;
    return this.http.get<Item[]>(url)
      .pipe(
        map(encomendas => encomendas[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} encomenda id=${id}`);
        }),
      catchError(this.handleError<Item>(`getItem id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getItem(id: number): Observable<Item> {
    const url = `${this.produtosUrl}/${id}`;
    return this.http.get<Item>(url).pipe(
      tap(_ => this.log(`fetched item id=${id}`)),
      catchError(this.handleError<Item>(`getItem id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchItens(term: string): Observable<Item[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Item[]>(`${this.produtosUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found itens matching "${term}"`)),
      catchError(this.handleError<Item[]>('searchItens', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addItem(produto: Item): Observable<Item> {
    return this.http.post<Item>(this.produtosUrl, produto, httpOptions).pipe(
      tap((produto: Item) => this.log(`added Item w/ id=${produto._id}`)),
      catchError(this.handleError<Item>('addItem'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteItem(item: Item | number): Observable<Item> {
    const id = typeof item === 'number' ? item : item._id;
    const url = `${this.produtosUrl}/${id}/delete`;

    return this.http.delete<Item>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Item id=${id}`)),
      catchError(this.handleError<Item>('deleteItem'))
    );
  }

  /** PUT: update the hero on the server */
  updateItem(item: Item): Observable<any> {
    return this.http.put(this.produtosUrl, item, httpOptions).pipe(
      tap(_ => this.log(`updated Item id=${item._id}`)),
      catchError(this.handleError<any>('updateItem'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ItemService: ${message}`);
  }
}
