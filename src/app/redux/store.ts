import { Pokemon } from "../models/pokemon";

export const GET_POKEMONS = 'GET_POKEMONS';
export const SEARCH_POKEMON = 'SEARCH_POKEMON';
export const ORDER_ASC = 'ORDER_ASC';
export const ORDER_DESC = 'ORDER_DESC';

export interface appState {
    pokemons: Pokemon[];
    search_pokemon: Pokemon[];
};

export const initialApp = {
    pokemons: [],
    search_pokemon: []
};

export function pokemonReducer(state: appState, action): appState{
    switch(action.type){
        case GET_POKEMONS:
            return {
                pokemons: state.pokemons.concat(action.payload),
                search_pokemon: state.search_pokemon.concat(action.payload)
            };
        case SEARCH_POKEMON:
            return {
                pokemons: state.pokemons,
                search_pokemon: state.pokemons.filter(item => item.name.startsWith(action.payload))
            };
        case ORDER_ASC:
            return {
                pokemons: state.pokemons,
                search_pokemon: state.search_pokemon.sort( (a,b) => {
                                    return a.name < b.name ? -1 : 1;
                                })
            };
        case ORDER_DESC:
            return {
                pokemons: state.pokemons,
                search_pokemon: state.search_pokemon.sort( (a,b) => {
                                    return a.name < b.name ? 1 : -1;
                                })
            };
        default:
            return state;
    }
}