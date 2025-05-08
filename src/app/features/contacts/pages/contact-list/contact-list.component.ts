import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  standalone: false
})
export class ContactListComponent implements OnInit {
  sheetUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    // Tạo URL an toàn cho iframe
    this.sheetUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://docs.google.com/spreadsheets/d/1WFyUzep1roLfhl-SizIdKoE7Rl3BdozWmGb5BTuOMFo/edit?resourcekey=&gid=514266987#gid=514266987'
    );
  }

  ngOnInit(): void {}
}
