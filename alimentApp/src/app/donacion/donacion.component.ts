import { Component, OnInit } from '@angular/core';
import { donacionService } from '../donacion/donacion.service';
import { Router } from '@angular/router';
import { donacion } from './donacion';
import { NgbModule  } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: 'donacion.component.html'
})

export class donacionComponent implements OnInit {
  public donacion: donacion = new donacion;
  dateMin = new Date()
  public usuarioActual=JSON.parse(localStorage.getItem("usuarioActual"));
  public title = "Crear Donacion";
  constructor(private donacionService: donacionService,
              private router: Router) { }

  ngOnInit(): void {
  }

  public createDonacion(): void{
    let fechaRecoleccionDate = new Date(this.donacion.fechaRecoleccion);
    if(fechaRecoleccionDate.getTime() < this.dateMin.getTime()){
      Swal.fire('Error', `La fecha ingresada debe ser mayor a la actual`, 'error')
    }else{
      let fecha = new Date(this.donacion.fechaRecoleccion);
      this.donacion.usuario = this.usuarioActual;
      this.donacionService.createDonacion(this.donacion)
          .subscribe(donacion => {             
            Swal.fire('Donacion creada', `La donacion de ${donacion.usuario.nombre} ha sido creada y programada
                       para su recoleccion el dia ${fecha.getDate()}/${fecha.getMonth()}/${fecha.getFullYear()} 
                       a las ${fecha.getHours()}:${fecha.getMinutes()}`, 'success')
          }
        );

    }
  }
}
