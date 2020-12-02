import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Routes } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.scss']
})
export class HeroeComponent implements OnInit {

  forma: FormGroup;

  constructor(private fb: FormBuilder, private heroesService: HeroesService, private router: ActivatedRoute) {
    this.crearFormulario();
    this.postear();


  }
  ngOnInit(): void {
  }
  crearFormulario() {
    this.forma = this.fb.group({
      idFirebase: [{ value: '', disabled: true }, []],
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      poder: ['', [Validators.required, Validators.minLength(4)]],
      estado: ['', [Validators.required]],
    })
  }
  limpiar_LlenarFormulario(id?: string, nombre?: string, poder?: string, estado?: boolean) {
    this.forma.patchValue({
      idFirebase: id,
      nombre: nombre,
      poder: poder,
      estado: estado,
    })
  }

  enviar() {
    if (this.forma.invalid) {
      console.log(this.forma);
      return
    }
    if (this.router.params['value']['id'] === 'nuevo') {

      this.heroesService.crearHeroe(this.forma.value).subscribe(
        res => {
          this.actualizarHeroe(res['name'])
        }
      )

      Swal.fire({
        title: 'Heroe Registrado Exitosamente!',
        icon: 'success'
      }
      )
    } else {
      let id: string = this.router.params['value']['id']
      this.actualizarHeroe(id)
      Swal.fire({
        title: 'Heroe Actualizado Exitosamente!',
        icon: 'success'
      }
      )
    }
  }
  


  // consultar() {
  //   this.heroesService.obtenerHeroes().subscribe(resp => {
  //     console.log(resp)

  //   });
  // }

  actualizarHeroe(id: string) {
    Object.assign(this.forma.value, { 'id': id })
    this.heroesService.actualizarIdHeroe(id, this.forma.value).subscribe(res => {
      console.log(res);


    })
  }
  postear() {
    let id = this.router.params['value']['id']
    if (id != 'nuevo') {
      this.heroesService.obtenerHeroe(id).subscribe(resp => {
        let heroe: any = resp
        let { estado, id, nombre, poder } = heroe
        this.limpiar_LlenarFormulario(id, nombre, poder, estado)
      });
    }
  };



}
