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
      title: 'Thống kê',
      icon: 'dashboard',
      route: '/dashboard',
    },
    {
      title: 'Quản lý người dùng',
      icon: 'user',
      route: '/users',
    },
    {
      title: 'Danh mục',
      icon: 'ordered-list',
      route: '/categories',
    },
    {
      title: 'Sản phẩm',
      icon: 'product',
      route: '/products',
    },
    {
      title: 'Tags',
      icon: 'tag',
      route: '/tags',
    },
    {
      title: 'Bài viết',
      icon: 'copy',
      route: '/post',
    },
    {
      title: 'Cần liên hệ',
      icon: 'contacts',
      route: '/contacts',
    },
    {
      title: 'Ký gửi mua bán',
      icon: 'contacts',
      route: '/consignment-sale',
    },
    {
      title: 'Ký gửi cho thuê',
      icon: 'contacts',
      route: '/consignment-rent',
    },
    {
      title: 'Cài đặt website',
      icon: 'setting',
      route: '/website-settings',
    },
  ];

  isActive(route: string): boolean {
    return this.currentRoute === route;
  }
}
