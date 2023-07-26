import { PokeApiService } from './../../service/poke-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  private urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon';
  private urlName: string = 'https://pokeapi.co/api/v2/pokemon-species';

  public pokemon: any
  public isLoading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokeApiService: PokeApiService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getPoke();
  }
  public getPoke() {
    const id = this.activatedRoute.snapshot.params['id'];
    const pokemon = this.pokeApiService.getPokemons(`${this.urlPokemon}/${id}`);
    const name = this.pokeApiService.getPokemons(`${this.urlName}/${id}`);

    return forkJoin([pokemon, name]).subscribe(
      (res: any) => {
        this.pokemon = res;
        this.isLoading = true;
      },
      error => {
        this.router.navigate(['404']);
      }
    )
  }

}
