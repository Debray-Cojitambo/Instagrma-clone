import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
})
export class OptionComponent implements OnInit {
  
  options = [
    { icon: 'settings-sharp', label: 'Configuración', redirectTo: '' },
    { icon: 'archive-outline', label: 'Archivo', redirectTo: '' },
    { icon: 'time-outline', label: 'Tu actividad', redirectTo: '' },
    { icon: 'qr-code-outline', label: 'Codigo QR', redirectTo: '' },
    { icon: 'bookmark-outline', label: 'Guardado', redirectTo: '' },
    { icon: 'list-outline', label: 'Mejores amigos', redirectTo: '' },
    { icon: 'star-outline', label: 'Favoritos', redirectTo: '' },
    { icon: 'person-add-outline', label: 'Descubrir personal', redirectTo: '' },
    { icon: 'heart-circle-outline', label: 'COVID-19 Information Centre', redirectTo: '' },
  ];
  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {}

}
