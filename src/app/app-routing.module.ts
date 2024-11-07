import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';  // Importa el componente
import { TiendaComponent } from './tienda/tienda.component';  // Importa el componente
import { LoginComponent } from './login/login.component';  // Importa el componente
import { RegistroComponent } from './registro/registro.component';  // Importa el componente
import { NoticiasComponent } from './noticias/noticias.component';  // Importa el componente
import { FaqsComponent } from './faqs/faqs.component';  // Importa el componente
import { AyudaComponent } from './ayuda/ayuda.component';  // Importa el componente
import { DescripcionComponent } from './descripcion/descripcion.component';  // Importa el componente
import { CartComponent } from './cart/cart.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { BibliotecaComponent } from './biblioteca/biblioteca.component';
import { WishlistComponent } from './wishlist/wishlist.component';


const routes: Routes = [
  { path: '', component: MainComponent, pathMatch: 'full' }, // Configura la ruta para la tienda
  { path: 'main', component: MainComponent }, // Configura la ruta para el inicio
  { path: 'tienda', component: TiendaComponent }, // Configura la ruta para la tienda
  { path: 'login', component: LoginComponent }, // Configura la ruta para el login
  { path: 'registro', component: RegistroComponent }, // Configura la ruta 
  { path: 'noticias', component: NoticiasComponent }, // Configura la ruta
  { path: 'faqs', component: FaqsComponent }, // Configura la ruta
  { path: 'ayuda', component: AyudaComponent }, // Configura la ruta
  { path: 'cart', component: CartComponent },
  { path: 'cuenta', component: CuentaComponent },
  { path: 'biblioteca', component: BibliotecaComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'descripcion/:id', component: DescripcionComponent, },  // Nueva ruta para la descripción
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
