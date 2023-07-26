import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit{

  private setPokemons: any;
  public pokemons: any;

  constructor(
    private pokeApiService: PokeApiService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.pokeApiService.apiListAllPokemons.subscribe(
      res => {
        this.setPokemons = res.results;
        this.pokemons = this.setPokemons;
      },
      error => {
        this.router.navigate(['404']);
      }
    );
  }

  public search(value: string) {
    const filter = this.setPokemons.filter((res: any) => {
      return !res.name.indexOf(value.toLowerCase());
    });

    this.pokemons = filter;
  }

}
