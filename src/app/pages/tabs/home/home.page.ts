import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OptionComponent } from '../profile/option/option.component';
import { FirestoreService } from '../../../service/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  slideOpts = {};
  stories: any[] = [];
  buttonValue = 'grid';
  buttonItems: any[] = [];
  posts: any[] = [];

  @ViewChildren('instaVideo') videos: QueryList<any>;

  feeds: any[] = [];

  nowPlaying = null;

  constructor(
    private modalCtrl: ModalController,
    private fire: FirestoreService){}


  ngOnInit() {
    this.slideOpts={
      slidesPerView: this.checkScreen(),
      slideShadows: true
    };
   this.fire.getCollection("estados").subscribe(of=>{this.stories=of})
   //this.fire.getCollection("posts").subscribe(of=>{this.posts=of});
   this.fire.getCollection("posts").subscribe(of=>{this.feeds=of});
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

  async options(){
    const options = {
      component: OptionComponent,
      cssClass: 'custom-modal',
      swipeToClose: true //ios only

    };
    const modal = await this.modalCtrl.create(options);
    await modal.present();
  }


  ngAfterViewInit() {    
    this.didScroll();
  }

  toggleWrap(feed) {
    feed.wrap = !feed.wrap;
  }

  isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  didScroll(event?) {
    console.log(event);
    if(this.nowPlaying && this.isElementInViewport(this.nowPlaying)) return;
    else if(this.nowPlaying && !this.isElementInViewport(this.nowPlaying)) {
      this.nowPlaying.pause();
      this.nowPlaying = null;
    }

    this.videos.forEach(player => {
      console.log('player', player);

      if(this.nowPlaying) return;

      const nativeElement = player.nativeElement;
      const inView = this.isElementInViewport(nativeElement);

      if(inView) {
        this.nowPlaying = nativeElement;
        this.nowPlaying.muted = true;
        this.nowPlaying.play();
      }
    });
  }

}
