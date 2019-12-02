import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FichaTormentaFront';

  constructor(private router:Router){}

  nav(){
    this.router.navigate(['talento'])
  }
}
