import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export default class LogoutComponent  implements OnInit{
  private router = inject(Router);
  ngOnInit(): void {
    sessionStorage.removeItem("token");
    this.router.navigate(['/']);
  }
}
