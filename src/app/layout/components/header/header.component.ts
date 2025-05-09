import { Component } from '@angular/core';
import { SidenavService } from '../../../core/services/sidenav.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isOpen$: Observable<boolean>;
  userLoggedIn: any;
  constructor(private sidenavService: SidenavService, private authService: AuthService, private router: Router) {
    this.isOpen$ = this.sidenavService.isOpen$;
  }
  ngOnInit() {
    this.getUserLoggedIn();
  }

  toggleSidenav() {
    this.sidenavService.toggle();
  }

  logout() {
   this.authService.logout();
   this.router.navigate(['/login']);
  }

  getUserLoggedIn() {
    this.userLoggedIn = JSON.parse(localStorage.getItem('user') || '{}');
    return this.userLoggedIn;
  }

  goToProfile() {
    this.router.navigate(['/account']);
  }
}
