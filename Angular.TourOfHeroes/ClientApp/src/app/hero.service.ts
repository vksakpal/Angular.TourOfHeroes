import { Injectable } from '@angular/core';
import { Hero } from 'src/models/hero';
import { HEROES } from 'src/models/mock-heroes';
import { of, Observable } from 'rxjs';
import { MessageServiceService } from './message-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  catchError, map,tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageServiceService, private http: HttpClient) { }

  private heroesUrl = "api/heroes";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  };

  getHeroes(): Observable<Hero[]>
  {
    // this.messageService.add('HeroService: Fetched');
    // return of(HEROES);
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.HandleError<Hero[]>('getHeros',[]))
    );
    
  }

  getHero(id: Number): Observable<Hero>
  {
    this.messageService.add(`Hero Service: fetched ID: ${id} `);
    return of(HEROES.find(hero => hero.id == id));

  }

  updateHero(hero:Hero): Observable<any>
  {
    debugger;
    console.log(hero.id);
    return this.http.put(this.heroesUrl, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id${hero.id}`)),
      catchError(this.HandleError<any>('updateHero'))
    );
    
  }

  addHero(hero:Hero): Observable<Hero>
  {
    return this.http.post<Hero>(this.heroesUrl, hero,this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`Added Hero w/ id=${newHero.id}`)),
      catchError(this.HandleError<Hero>('addHero'))
    );
  }

  deleteHero(hero: Hero | number): Observable<Hero>{
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`Deleted hero  id=${id}`)),
      catchError(this.HandleError<Hero>('deleteHero'))
    );
  }

  searchHeros (term: string): Observable<Hero[]>
  {
    if(!term.trim())
    {
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${name}`).pipe
    (
      tap(x => x.length ? this.log(`found heros matching "${term}"`) : this.log(`no heroes matching "${term}"`)),
      catchError(this.HandleError<Hero[]>('searchHeroes', []))
    );
  }

  private log(message: string)
  {
    this.messageService.add(`HeroService: ${message}`);
  }

  private HandleError<T>(operation='operation', result?: T)
  {
    return (error:any) : Observable<T> => {
      console.log(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

   
}
