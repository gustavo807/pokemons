import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon';
import { Observable } from 'rxjs';
import  'rxjs/add/operator/concat';


@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
  providers: [PokemonService]
})
export class PokemonComponent implements OnInit {
  pokemons : Observable<Pokemon[]>;
  offset : number = 0;
  loading : boolean = true;

  constructor(private pokemonService : PokemonService) {
    this.pokemons = Observable.of([]);
   }

  ngOnInit() {
    this.getPokemons();
  }

  getPokemons(){
    this.loading = false;
    Observable.forkJoin(this.pokemons, this.pokemonService.getPokemons(20, this.offset))
      
      .map(res => {
        return Observable.of([].concat(...res));
      })
    
      .subscribe(res => {
        console.log(res);     
        this.pokemons = res;
        this.offset += 20;
        this.loading = true;
      });
      
  }

}