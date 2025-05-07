import { Component } from '@angular/core';
import { SidenavService } from '../../../core/services/sidenav.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isOpen$: Observable<boolean>;

  constructor(private sidenavService: SidenavService) {
    this.isOpen$ = this.sidenavService.isOpen$;
  }

  toggleSidenav() {
    this.sidenavService.toggle();
  }
}
