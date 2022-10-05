import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirestorageService } from 'src/app/service/firestorage.service';
import { FirestoreService } from 'src/app/service/firestore.service';
import { Feeds } from '../../../interface/models';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  
  newPost: Feeds = {
    id: this.fireservice.getId(), 
    logo: '', 
    username: '', 
    location: '', 
    src: '',
    description: '',
    image: '',
    likes: ''
  }

  private path = 'posts';

  posts: Feeds[] = [];

  newImage: '';

  newFile= '';

  constructor(   
    public nav: NavController,
    public fireservice: FirestoreService,
    public firestorage: FirestorageService
  ) { }
  

  ngOnInit() {
   this.getposts();
   this.fireservice.getCollection("posts").subscribe(of=>{this.posts=of as any});
  }

  async guardarPost(){
    const name = this.newPost.logo;
    const resp = await this.firestorage.uploadImage(
      this.newFile,
      this.path,
      name
    ); //carga la imagen en firestorage
    this.newPost.logo = resp;
    this.fireservice.createDoc(this.newPost, this.path, this.newPost.id)
    this.nav.navigateForward("/tabs/home")
  }

  getposts(){
    this.fireservice.getCollection<Feeds>(this.path).subscribe(res=> {
     this.posts = res;
      console.log(res);

    });

  }

  async subirArchivo(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (image) => {
        this.newImage = image.target.result as '';
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  
}
