import { Component, HostListener } from '@angular/core';
import { SidenavService } from '../core/services/sidenav.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  isOpen$: Observable<boolean>;

  constructor(private sidenavService: SidenavService) {
    this.isOpen$ = this.sidenavService.isOpen$;
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    if (window.innerWidth <= 768) {
      this.sidenavService.close();
    } else {
      this.sidenavService.open();
    }
  }
}
