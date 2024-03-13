import { Component, OnInit } from '@angular/core';
import { PokemonData } from 'src/app/models/pokemonData';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  pokemon:PokemonData = {
    id: 0,
    name: '',
    types: [],
    sprites: {
      front_default: ''
    }
  }

  constructor(
    private service:PokemonService
  ) { }

  ngOnInit(): void {
    this.getPokemon('charmander')
  }

  getPokemon(searchName:string){
    this.service.getPokemon(searchName).subscribe(
      {
        next: (res) => {

          this.pokemon = {
            id: res.id,
            name: res.name,
            sprites: res.sprites,
            types: res.types

          }
          console.log(res)
          console.log(this.pokemon)
        },
        error: (err) => {
          this.pokemon = {
            id: -1,
            name: "Não encontrado",
            types:[{
              slot: -1,
              type:{
                  name:'',
                  url:''
                }
            }],
            sprites: {
              front_default:'' 
            }
          }
          console.log(err)
        }
      }
    )
  }

  
}
