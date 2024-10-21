import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';  // Importa el componente
import { TiendaComponent } from './tienda/tienda.component';  // Importa el componente
import { LoginComponent } from './login/login.component';  // Importa el componente
import { RegistroComponent } from './registro/registro.component';  // Importa el componente
import { NoticiasComponent } from './noticias/noticias.component';  // Importa el componente


const routes: Routes = [
  { path: '', component: MainComponent, pathMatch: 'full' }, // Configura la ruta para la tienda
  { path: 'main', component: MainComponent }, // Configura la ruta para el inicio
  { path: 'tienda', component: TiendaComponent }, // Configura la ruta para la tienda
  { path: 'login', component: LoginComponent }, // Configura la ruta para el login
  { path: 'registro', component: RegistroComponent }, // Configura la ruta para la tienda
  { path: 'noticias', component: NoticiasComponent }, // Configura la ruta para la tienda
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
