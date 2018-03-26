import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon';

import { NgRedux, select } from '@angular-redux/store';
import { appState, initialApp, GET_POKEMONS, SEARCH_POKEMON, ORDER_ASC, ORDER_DESC } from '../../redux/store';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
  providers: [PokemonService]
})
export class PokemonComponent implements OnInit {
  //pokemons : Pokemon[] = [];
  offset : number = 0;
  loading : boolean = true;

  @select() search_pokemon;

  constructor(
    private ngRedux: NgRedux<appState>,
    private pokemonService : PokemonService) { }

  ngOnInit() {
    this.getPokemons();
  }

  getPokemons(){
    this.loading = false;
    this.pokemonService.getPokemons(20, this.offset)
      .subscribe(res => {
        this.ngRedux.dispatch({
          type: GET_POKEMONS, 
          payload: res 
        });
        this.offset += 20;
        this.loading = true;
      });
  }

  searchPokemon(value : string){
    this.ngRedux.dispatch({
      type: SEARCH_POKEMON,
      payload: value
    });
  }

  onOrder(value : string){
    switch(value){
      case "1":
        this.ngRedux.dispatch({
          type: ORDER_ASC,
          payload: ''
        });
        break;
      case "2":
        this.ngRedux.dispatch({
          type: ORDER_DESC,
          payload: ''
        });
        break;
      default:
        break;
    }
  }

}
