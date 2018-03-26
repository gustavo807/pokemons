import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Pokemon } from '../models/pokemon';

@Injectable()
export class PokemonService {

  constructor(
    private http : Http
  ) { }

  getPokemons(limit : number, offset : number) :  Observable<Pokemon[]>{
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
      .map(res => {
        return res.json().results.map(item => {
          var split = item.url.split("/");
          var number = split[ split.length - 2];
          var url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`;
          return {
            name : item.name,
            sprite : url
          };
        });
      });
      
  }

}
