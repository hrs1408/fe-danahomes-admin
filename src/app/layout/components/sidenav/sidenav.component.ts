import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SidenavService } from '../../../core/services/sidenav.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  standalone: false,
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  currentRoute: string = '';
  isOpen$: Observable<boolean>;

  constructor(
    private router: Router,
    private sidenavService: SidenavService
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.url;
      if (window.innerWidth <= 768) {
        this.sidenavService.close();
      }
    });

    this.isOpen$ = this.sidenavService.isOpen$;
  }

  sidenavItems = [
    {
      title: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard',
    },
    {
      title: 'Users',
      icon: 'user',
      route: '/users',
    },
    {
      title: 'Categories',
      icon: 'ordered-list',
      route: '/categories',
    },
    {
      title: 'Products',
      icon: 'product',
      route: '/products',
    },
    {
      title: 'Tags',
      icon: 'tag',
      route: '/tags',
    },
    {
      title: 'Post',
      icon: 'copy',
      route: '/post',
    },
    {
      title: 'Settings',
      icon: 'setting',
      route: '/website-settings',
    },
  ];

  isActive(route: string): boolean {
    return this.currentRoute === route;
  }
}
