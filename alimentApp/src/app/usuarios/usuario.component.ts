import {Component, OnInit} from '@angular/core';
import {usuario} from './usuario';
import {usuarioService} from './usuario.service';
import swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { contacto } from './contacto';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuario.component.html'
})

export class usuarioComponent implements OnInit {
  public usuarioActual=JSON.parse(localStorage.getItem("usuarioActual"));
  usuarios: usuario[] = [];
  public infoContacto: contacto = new contacto();
  public usuario: usuario = new usuario;
  public usuarioEditar: usuario = null;

  public title = "Registro";
  constructor(private usuarioService: usuarioService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(){
    if(this.usuarioActual !== null){
      if(this.usuarioActual && this.usuarioActual.rol !== "Admin"){
        this.usuarioEditar = this.usuarioActual
      }
      this.usuarioService.getUsuarios().subscribe(
        usuarios => this.usuarios = usuarios
      );
    }
  }

  delete(usuario: usuario): void {
    swal.fire({
      title: 'Esta seguro?',
      text: `Quiere eliminar este usuario ${usuario.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.usuarioService.delete(usuario.cedula).subscribe(
          response => {
            this.usuarios = this.usuarios.filter(cli => cli !== usuario)
            swal.fire(
              'Usuario Eliminado',
              `Usuario ${usuario.nombre} eliminado correctamente.`,
              'success'
            )
          }
        )

      }
    })
  }

  getUsuario(): void{
    this.activatedRoute.params.subscribe(params => {
      let cedula = params['cedula']
      if(cedula){
        this.usuarioService.getUsuario(cedula).subscribe( (usuario) => this.usuario = usuario)
      }
    })
  }

  public create(): void{  
    if(this.usuarioEditar!=null){
      if(!moment(this.usuarioEditar.fechaNacimiento, 'YYYY-MM-DD',true).isValid()){
        swal.fire("Formato de fecha incorrecto.");
      }else{
        this.update();
      }
    }else{
      if(!moment(this.usuario.fechaNacimiento, 'YYYY-MM-DD',true).isValid()){
        swal.fire("Formato de fecha incorrecto.");
      }else{
        this.usuario.infoContacto = this.infoContacto
        this.usuarioService.create(this.usuario)
        .subscribe(usuario => {               
          this.usuarioService.getUsuarios().subscribe(
            usuarios => this.usuarios = usuarios
          );
          this.router.navigate(['/usuarios'])
          swal.fire('Nuevo usuario', `usuario ${usuario.nombreUsuario} creado`, 'success')
        }
        );   
      }
    }
  }

  update():void{
    this.usuarioService.update(this.usuarioEditar)
    .subscribe( usuarioEditar => {
      this.router.navigate(['/usuarios'])
      swal.fire('Usuario actualizado', `usuario ${usuarioEditar.nombreUsuario} actualizado`, 'success')
    }
    )
  }

  edit(usuarioEditar: usuario):void{
    this.usuarioEditar = usuarioEditar;
  }

}
