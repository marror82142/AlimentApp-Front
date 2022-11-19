import { Component, OnInit } from '@angular/core';
import { usuario } from '../usuario';
import { usuarioService } from '../usuario.service'
import { Router } from '@angular/router'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './confirmarRecuperar.component.html'
})
export class ConfirmarRecuperarComponent implements OnInit {
  public title = "Recuperar Contrasena";
  public codigoRecuperacionAConfirmar = "";
  public usuarioActual=JSON.parse(localStorage.getItem("usuarioActual"));
  constructor(private usuarioService: usuarioService,
              private router: Router) { }

  ngOnInit(): void {
  }

  public confirmarRecuperacion(): void{
    if(this.codigoRecuperacionAConfirmar !== ""){
       if(this.usuarioActual.codigoRecuperacion){
          if(this.codigoRecuperacionAConfirmar===this.usuarioActual.codigoRecuperacion.toString()){
            Swal.fire('Exito', `Confirmado`, 'success')
            this.router.navigate(['/cambiarContrasena'])
          }else{
            Swal.fire('Error', `El codigo es incorrecto`, 'error')
          }
       }else{
        Swal.fire('Error', `Algo fallo contactese con administracion`, 'error')
       }
    }else{
        Swal.fire('Error', `El campo es requerido`, 'error')
    }
  }

}
