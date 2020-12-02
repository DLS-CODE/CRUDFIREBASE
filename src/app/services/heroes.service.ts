import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private url = 'https://fir-crud-95610.firebaseio.com/'

  constructor(private  http:HttpClient ) { }

  crearHeroe(heroe:any){
    return this.http.post(`${this.url}/heroes.json`, heroe)
  }
  obtenerHeroes(){
    return  this.http.get(`${this.url}/heroes.json`)
  }
  obtenerHeroe(id:string){
    return  this.http.get(`${this.url}/heroes/${id}.json`)
  }
  actualizarIdHeroe( id:string, heroe:any){
    return this.http.put(`${this.url}/heroes/${id}.json`, heroe)
  }
  borrarHeroe(id:string){
    return this.http.delete(`${this.url}/heroes/${id}.json`)
  }
}
