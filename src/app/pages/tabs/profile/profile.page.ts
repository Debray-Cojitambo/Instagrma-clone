import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OptionComponent } from './option/option.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  slideOpts = {};
  stories: any[] = [];
  buttonValue = 'grid';
  buttonItems: any[] = [];
  posts: any[] = [];

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.stories=[
      {name:'New'},
      {name:'Trabajo', src:'assets/icon/a.png'},
      {name:'Animales', src:'assets/icon/b.png'},
      {name:'Hermana', src:'assets/icon/c.png'},
      {name:'Campo', src:'assets/icon/d.png'},
      {name:'Amigos', src:'assets/icon/e.png'},
    ];
    this.slideOpts={
      slidesPerView: this.checkScreen(),
      slideShadows: true
    };
    this.buttonItems = [
      {value: 'grid', icon: 'grid'},
      {value: 'reels', icon: 'film'},
      {value: 'photos', icon: 'images'},
    ];
    this.posts = [
      { id: 1, url: 'assets/icon/1.jpg'},
      { id: 2, url: 'assets/icon/2.jpg'},
      { id: 3, url: 'assets/icon/3.jpg'},
      { id: 4, url: 'assets/icon/4.jpg'},
      { id: 9, url: 'assets/icon/5.jpg'},
      { id: 6, url: 'assets/icon/6.jpg'},
      { id: 5, url: 'assets/icon/7.jpg'},
      { id: 8, url: 'assets/icon/8.jpg'},
      { id: 7, url: 'assets/icon/9.webp'},
      { id: 10, url: 'assets/icon/10.jpg'},
      { id: 11, url: 'assets/icon/11.jpg'},
      { id: 12, url: 'assets/icon/12.jpg'},
    ];
  }
  checkScreen() {
    let innerWidth = window.innerWidth;
    console.log(innerWidth);
    switch (true) {
      case 340 > innerWidth:
        return this.checkLength(5.5);
      case 340 <= innerWidth && innerWidth <= 400:
        return this.checkLength(5.5);
      case 401 <= innerWidth && innerWidth <= 700:
        return this.checkLength(6.5);
      case 701 <= innerWidth && innerWidth <= 900:
        return this.checkLength(7.5);
      case 901 <= innerWidth:
        return this.checkLength(9.5);
    }
  }
  checkLength(val) {
    let length = this.stories.length;
    return val < length ? val : length;
  }
  buttonsChanged(event) {
    console.log(event.detail.value);
    this.buttonValue = event.detail.value;
  }

  async options() {
    const options = {
      component: OptionComponent,
      cssClass: 'custom-modal',
      swipeToClose: true
    };
    const modal = await this.modalCtrl.create(options);
    await modal.present();
  }
}
