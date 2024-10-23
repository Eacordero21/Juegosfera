import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-descripcion',
  templateUrl: './descripcion.component.html',
  styleUrls: ['./descripcion.component.css']
})
export class DescripcionComponent implements OnInit {
  product: any;  // Aquí almacenaremos el producto actual

  // Lista de productos (puedes obtener esto desde un servicio también)
  products = [
    { id: 1, name: 'Juego 1', sku: 'WH1000XM4', description: 'Juego de aventura épico con gráficos impresionantes.', price: 500, discountPrice: 450, image: '/assets/Portada truth1.png', features: ['Inmersión total', 'Multijugador', 'Alta resolución'] },
    { id: 2, name: 'Juego 2', sku: 'WH2000AB1', description: 'Juego de carreras con físicas realistas y gráficos en 3D.', price: 350, discountPrice: 300, image: '/assets/WhatsApp Image 2024-10-22 at 12.40.02 PM.jpeg', features: ['Competencias online', 'Alta velocidad', 'Multijugador'] },
    { id: 3, name: 'Juego 3', sku: 'WH3000XT3', description: 'Juego de estrategia por turnos con un mapa enorme y gran detalle.', price: 450, discountPrice: 400, image: '/assets/WhatsApp Image 2024-10-22 at 12.44.43 PM.jpeg', features: ['Modo historia', 'Multijugador', 'Expansión de mundo'] }
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Capturar el id de la URL
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    
    // Buscar el producto con el id correspondiente
    this.product = this.products.find(p => p.id === productId);
  }
}

