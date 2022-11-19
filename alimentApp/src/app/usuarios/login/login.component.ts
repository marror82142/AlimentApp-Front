import { Component, OnInit } from '@angular/core';
import { usuario } from '../usuario';
import { usuarioService } from '../usuario.service'
import { Router } from '@angular/router'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public usuario: usuario = new usuario;
  public usuarioActual=JSON.parse(localStorage.getItem("usuarioActual"));
  public title = "Iniciar Sesion";
  public correoRecuperacion = "";
  public codigoRecuperacion = 0;
  constructor(private usuarioService: usuarioService,
              private router: Router) { }

  ngOnInit(): void {
  }

  public login(): void{
    if(this.usuario.contrasena == null
      || this.usuario.nombreUsuario == null
    ){
      alert("Los campos son requeridos");
    }else{
        this.usuarioService.login(this.usuario).subscribe(
          response => {     
                        localStorage.setItem('usuarioActual', JSON.stringify(response));
                        if(response.rol == "Usuario"){
                          this.router.navigate(['/usuarios'])
                        }else{
                          this.router.navigate(['/usuarios'])
                        }
                      },
          error => Swal.fire('Error', `Nombre de usuario o contrasena incorrectos`, 'error')
        )    
    }
  }

}
