import { Component } from '@angular/core';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent {
  activeSection: string = 'account';

  setActiveSection(section: string) {
    this.activeSection = section;
  }

}
