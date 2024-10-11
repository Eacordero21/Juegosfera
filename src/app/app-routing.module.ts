import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';  // Importa el componente
import { TiendaComponent } from './tienda/tienda.component';  // Importa el componente


const routes: Routes = [
  { path: 'main', component: MainComponent }, // Configura la ruta para la tienda
  { path: 'tienda', component: TiendaComponent }, // Configura la ruta para la tienda
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
