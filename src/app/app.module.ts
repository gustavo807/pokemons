import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';

import { NgRedux, NgReduxModule, DevToolsExtension } from '@angular-redux/store';
import { appState, pokemonReducer, initialApp } from './redux/store';

@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgReduxModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private ngRedux: NgRedux<appState>, private devTools: DevToolsExtension){
    let enhancers = [];
    if(devTools.isEnabled()){
      enhancers = [...enhancers, devTools.enhancer()];
    }
    ngRedux.configureStore(pokemonReducer, initialApp, [], enhancers);
  }
 }
