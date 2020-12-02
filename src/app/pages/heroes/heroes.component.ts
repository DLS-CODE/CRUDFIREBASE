import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes: any = [];
  loading = true
  noRegistros: boolean

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.cargarndoHeroes()
  }

  cargarndoHeroes() {
    this.heroesService.obtenerHeroes().subscribe(resp => {

      try {
        this.loading = false
        this.heroes = Object.values(resp)
      } catch (error) {
        this.noRegistros = true
      }
    });
  }

  consultar() {
    console.log(this.heroes);

  }

  borrar(i: number, id: string) {
    Swal.fire({
      title: 'Estas seguro/a?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.heroes.splice(i, 1)
        this.heroesService.borrarHeroe(id).subscribe()
        Swal.fire(
          {
            title: 'Heroe Borrado Exitosamente!',
            icon: 'success'}
        )
      }
    })



  }


}
