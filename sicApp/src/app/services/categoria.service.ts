import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Categoria } from '../model/categoria';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class CategoriaService {

  private produtosUrl = 'https://localhost:5001/api/categoria';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.produtosUrl)
      .pipe(
        tap(_ => this.log('fetched categorias')),
        catchError(this.handleError('getCategorias', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getCategoriaNo404<Data>(id: number): Observable<Categoria> {
    const url = `${this.produtosUrl}/?id=${id}`;
    return this.http.get<Categoria[]>(url)
      .pipe(
        map(categorias => categorias[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} categoria id=${id}`);
        }),
        catchError(this.handleError<Categoria>(`getCategoria id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getCategoria(id: number): Observable<Categoria> {
    const url = `${this.produtosUrl}/${id}`;
    return this.http.get<Categoria>(url).pipe(
      tap(_ => this.log(`fetched categoria id=${id}`)),
      catchError(this.handleError<Categoria>(`getCategoria id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchCategorias(term: string): Observable<Categoria[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Categoria[]>(`${this.produtosUrl}/?nome=${term}`).pipe(
      tap(_ => this.log(`found Categoria matching "${term}"`)),
      catchError(this.handleError<Categoria[]>('searchCategoria', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addCategoria(produto: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.produtosUrl, produto, httpOptions).pipe(
      tap((produto: Categoria) => this.log(`added categoria w/ id=${produto.id}`)),
      catchError(this.handleError<Categoria>('addCategoria'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteCategoria(produto: Categoria | number): Observable<Categoria> {
    const id = typeof produto === 'number' ? produto : produto.id;
    const url = `${this.produtosUrl}/${id}`;

    return this.http.delete<Categoria>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Categoria id=${id}`)),
      catchError(this.handleError<Categoria>('deleteCategoria'))
    );
  }

  /** PUT: update the hero on the server */
  updateCategoria(produto: Categoria): Observable<any> {
    return this.http.put(this.produtosUrl, produto, httpOptions).pipe(
      tap(_ => this.log(`updated Categoria id=${produto.id}`)),
      catchError(this.handleError<any>('updateCategoria'))
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
    this.messageService.add(`CategoriaService: ${message}`);
  }
}
