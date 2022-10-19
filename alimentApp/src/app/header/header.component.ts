import {Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent {
title = 'AlimentApp'
public usuarioActual=JSON.parse(localStorage.getItem("usuarioActual"));
  constructor(private router: Router){}
  public cerrarSesion(): void{
    if(this.usuarioActual){
      localStorage.clear()
      localStorage.setItem('usuarioActual', JSON.stringify(null))
      this.router.navigate([''])
    }
  }
}
