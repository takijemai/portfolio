import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isDarkMode = false;
constructor(){}
toggleDarkMode() {
  this.isDarkMode = !this.isDarkMode;
}
}
