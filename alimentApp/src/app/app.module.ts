import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { usuarioComponent } from './usuarios/usuario.component';
import { usuarioService } from './usuarios/usuario.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './usuarios/login/login.component';
import { donacionComponent } from './donacion/donacion.component';
import { donacionService } from './donacion/donacion.service';
import { RecuperarComponent } from './usuarios/login/recuperar.component';
import { ConfirmarRecuperarComponent } from './usuarios/login/confirmarRecuperar.component';
import { CambiarContrasenaComponent } from './usuarios/cambiarContrasena.component';


const routes: Routes = [
  {path: '', component: LoginComponent, pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path: 'usuarios', component: usuarioComponent},
  {path: 'donacion', component: donacionComponent},
  {path: 'recuperarContrasena', component: RecuperarComponent},
  {path: 'confirmarRecuperacion', component: ConfirmarRecuperarComponent},
  {path: 'cambiarContrasena', component: CambiarContrasenaComponent}  
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    usuarioComponent,
    donacionComponent,
    LoginComponent,
    RecuperarComponent,
    ConfirmarRecuperarComponent,
    CambiarContrasenaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,    
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [usuarioService, donacionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
