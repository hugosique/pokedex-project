import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Observable
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private url: string = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100'

  constructor(
    private http: HttpClient,
  ) { }

  get apiListAllPokemons(): Observable<any> {
    return this.http.get(this.url).pipe(
      tap(res => res),
      tap((res: any) => {
        res.results.map((resPokemons: any) => {
          this.getPokemons(resPokemons.url).subscribe(
            res => resPokemons.status = res
          )
        });
      }),
    );
  }

  public getPokemons(url: string): Observable<any> {
    return this.http.get(url).pipe(
      map(
        res => res
      )
    );
  }
}
