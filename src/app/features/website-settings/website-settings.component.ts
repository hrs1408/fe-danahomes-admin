import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

interface TabItem {
  title: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-website-settings',
  standalone: false,
  templateUrl: './website-settings.component.html',
  styleUrl: './website-settings.component.scss'
})
export class WebsiteSettingsComponent implements OnInit {
  tabs: TabItem[] = [
    {
      title: 'Quản lý giới thiệu',
      route: './introduct-manager',
      icon: 'profile'
    },
    {
      title: 'Quản lý thông tin',
      route: './information-manager',
      icon: 'setting'
    }
  ];

  selectedTabIndex = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects;
      if (url.includes('introduct-manager')) {
        this.selectedTabIndex = 0;
      } else if (url.includes('information-manager')) {
        this.selectedTabIndex = 1;
      }
    });
  }

  onTabChange(index: number) {
    this.router.navigate([this.tabs[index].route], { relativeTo: this.route });
  }
}
