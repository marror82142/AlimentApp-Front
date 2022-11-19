import { Component, OnInit } from '@angular/core';
import { usuario } from '../usuario';
import { usuarioService } from '../usuario.service'
import { Router } from '@angular/router'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './recuperar.component.html'
})
export class RecuperarComponent implements OnInit {
  public title = "Recuperar Contrasena";
  public correoRecuperacion = "";
  constructor(private usuarioService: usuarioService,
              private router: Router) { }

  ngOnInit(): void {
  }

  public recuperarContrasena(): void{
    if(this.correoRecuperacion === "" ){
      alert("Los campos son requeridos");
    }else{
        this.usuarioService.recuperarContrasena(this.correoRecuperacion).subscribe(
          response => {     
                        if(response !== null){
                          let usr = JSON.stringify(response)
                          localStorage.setItem('usuarioActual', JSON.stringify(response));
                          Swal.fire('Exito', `Se envio un correo con  el codigo de recuperacion`, 'success')
                          this.router.navigate(['/confirmarRecuperacion'])
                        }else{
                          Swal.fire('Error', `El correo no esta registrado`, 'error')
                        }
                      },
          error => Swal.fire('Error', `Algo fallo contactese con administracion`, 'error')
        )    
    }
  }

}
