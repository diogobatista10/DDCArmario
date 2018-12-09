import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Acabamento } from '../model/acabamento';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class AcabamentoService {

  private produtosUrl = 'https://localhost:5001/api/acabamento';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
  getAcabamentos(): Observable<Acabamento[]> {
    return this.http.get<Acabamento[]>(this.produtosUrl)
      .pipe(
        tap(_ => this.log('fetched acabamentos')),
        catchError(this.handleError('getAcabamentos', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getAcabamentoNo404<Data>(id: number): Observable<Acabamento> {
    const url = `${this.produtosUrl}/?id=${id}`;
    return this.http.get<Acabamento[]>(url)
      .pipe(
        map(acabamentos => acabamentos[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} acabamento id=${id}`);
        }),
        catchError(this.handleError<Acabamento>(`getAcabamento id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getAcabamento(id: number): Observable<Acabamento> {
    const url = `${this.produtosUrl}/${id}`;
    return this.http.get<Acabamento>(url).pipe(
      tap(_ => this.log(`fetched acabamento id=${id}`)),
      catchError(this.handleError<Acabamento>(`getAcabamento id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchAcabamentos(term: string): Observable<Acabamento[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Acabamento[]>(`${this.produtosUrl}/?nome=${term}`).pipe(
      tap(_ => this.log(`found acabamentos matching "${term}"`)),
      catchError(this.handleError<Acabamento[]>('searchAcabamentos', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addAcabamento(produto: Acabamento): Observable<Acabamento> {
    return this.http.post<Acabamento>(this.produtosUrl, produto, httpOptions).pipe(
      tap((produto: Acabamento) => this.log(`added acabamento w/ id=${produto.id}`)),
      catchError(this.handleError<Acabamento>('addAcabamento'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteAcabamento(produto: Acabamento | number): Observable<Acabamento> {
    const id = typeof produto === 'number' ? produto : produto.id;
    const url = `${this.produtosUrl}/${id}`;

    return this.http.delete<Acabamento>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted acabamento id=${id}`)),
      catchError(this.handleError<Acabamento>('deleteAcabamento'))
    );
  }

  /** PUT: update the hero on the server */
  updateAcabamento(produto: Acabamento): Observable<any> {
    return this.http.put(this.produtosUrl, produto, httpOptions).pipe(
      tap(_ => this.log(`updated Acabamento id=${produto.id}`)),
      catchError(this.handleError<any>('updateAcabamento'))
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
    this.messageService.add(`AcabamentoService: ${message}`);
  }
}
