import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  isDarkMode = false;
constructor(){}
toggleDarkMode() {
  this.isDarkMode = !this.isDarkMode;
}
}
