import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})



export class HomeUserComponent {
  constructor(private router: Router) { }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
