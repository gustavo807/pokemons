import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
  providers: [PokemonService]
})
export class PokemonComponent implements OnInit {
  pokemons : Pokemon[] = [];
  offset : number = 0;
  loading : boolean = true;

  constructor(private pokemonService : PokemonService) { }

  ngOnInit() {
    this.getPokemons();
  }

  getPokemons(){
    this.loading = false;
    this.pokemonService.getPokemons(20, this.offset)
      .subscribe(res => {
        console.log(res);
        this.pokemons = this.pokemons.concat(res);
        this.offset += 20;
        this.loading = true;
      });
  }

}
