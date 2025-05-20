import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-consignment-rent-list',
  templateUrl: './consignment-rent-list.component.html',
  styleUrls: ['./consignment-rent-list.component.scss'],
  standalone: false
})
export class ConsignmentRentListComponent implements OnInit {
  sheetUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    // Tạo URL an toàn cho iframe
    this.sheetUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://docs.google.com/spreadsheets/d/1EkkjdQ1OdfYy18167kQpMgbFUn6BIPhYfwHGgOYZgJ0/edit?resourcekey=&gid=1762548340#gid=1762548340'
    );
  }

  ngOnInit(): void {
    // TODO: Load data from API
  }
}
