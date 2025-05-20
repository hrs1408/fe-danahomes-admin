import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-consignment-sale-list',
  templateUrl: './consignment-sale-list.component.html',
  styleUrls: ['./consignment-sale-list.component.scss'],
  standalone: false
})
export class ConsignmentSaleListComponent implements OnInit {
  sheetUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    // Tạo URL an toàn cho iframe
    this.sheetUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://docs.google.com/spreadsheets/d/13AcL_8jT_Ot5cNiVL5jUbe8eNGBuQAs2G_8NTribvrw/edit?resourcekey=&gid=1448107139#gid=1448107139'
    );
  }

  ngOnInit(): void {
  }
}
