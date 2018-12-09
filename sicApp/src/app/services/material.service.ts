import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Material } from '../model/material';
import { MessageService } from './message.service';
import { Acabamento } from '../model/Acabamento';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class MaterialService {

  private produtosUrl = 'https://localhost:5001/api/material';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
  getMateriais(): Observable<Material[]> {
    return this.http.get<Material[]>(this.produtosUrl)
      .pipe(
        tap(_ => this.log('fetched materiais')),
        catchError(this.handleError('getMateriais', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getMaterialNo404<Data>(id: number): Observable<Material> {
    const url = `${this.produtosUrl}/?id=${id}`;
    return this.http.get<Material[]>(url)
      .pipe(
        map(encomendas => encomendas[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} Material id=${id}`);
        }),
      catchError(this.handleError<Material>(`getMaterial id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getMaterial(id: number): Observable<Material> {
    const url = `${this.produtosUrl}/${id}`;
    return this.http.get<Material>(url).pipe(
      tap(_ => this.log(`fetched Material id=${id}`)),
      catchError(this.handleError<Material>(`getMaterial id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchMateriais(term: string): Observable<Material[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Material[]>(`${this.produtosUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found Materiais matching "${term}"`)),
      catchError(this.handleError<Material[]>('searchMateriais', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addMaterial(produto: Material): Observable<Material> {
    return this.http.post<Material>(this.produtosUrl, produto, httpOptions).pipe(
      tap((produto: Material) => this.log(`added Material w/ id=${produto.id}`)),
      catchError(this.handleError<Material>('addMaterial'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteMaterial(produto: Material | number): Observable<Material> {
    const id = typeof produto === 'number' ? produto : produto.id;
    const url = `${this.produtosUrl}/${id}`;

    return this.http.delete<Material>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Material id=${id}`)),
      catchError(this.handleError<Material>('deleteMaterial'))
    );
  }

  /** PUT: update the hero on the server */
  updateMaterial(produto: Material): Observable<any> {
    return this.http.put(this.produtosUrl, produto, httpOptions).pipe(
      tap(_ => this.log(`updated Material id=${produto.id}`)),
      catchError(this.handleError<any>('updateMaterial'))
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
    this.messageService.add(`MaterialService: ${message}`);
  }
}
