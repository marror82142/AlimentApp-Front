import {Component, OnInit} from '@angular/core';
import {usuario} from './usuario';
import {usuarioService} from './usuario.service';
import swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { contacto } from './contacto';
import { donacion } from '../donacion/donacion';

@Component({
  selector: 'app-usuarios',
  templateUrl: './cambiarContrasena.component.html'
})

export class CambiarContrasenaComponent implements OnInit {
  public usuarioActual=JSON.parse(localStorage.getItem("usuarioActual"));
  usuarios: usuario[] = [];
  public infoContacto: contacto = new contacto();
  public usuario: usuario = new usuario;
  public usuarioEditar: usuario = null;
  public donacion: donacion = new donacion;
  public contrasenaAconfirmar:string="";
  public contrasena:string="";
  public title = "Registro";
  constructor(private usuarioService: usuarioService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

    ngOnInit(){
    }

    public cambiarContrasena():void{
      if(this.contrasena === this.contrasenaAconfirmar){        
        this.usuarioActual.contrasena = this.contrasena
        this.usuarioService.create(this.usuarioActual)
              .subscribe(usuario => {
                this.router.navigate(['/login'])
                localStorage.setItem('usuarioActual', null);
                swal.fire('Exito', `Contrasena acutalizada`, 'success')
              });  
      }else{
        swal.fire('Error', `Las contrasenas deben coincidir`, 'error')
      }
    }

}
