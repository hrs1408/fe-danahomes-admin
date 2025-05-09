import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardSummary } from '../../types/dashboard.type';

@Component({
  selector: 'app-overview',
  standalone: false,
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent implements OnInit {
  summary: DashboardSummary | null = null;
  loading = false;
  currentTime = new Date();

  constructor(
    private dashboardService: DashboardService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
    setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  loadDashboard(): void {
    this.loading = true;
    this.dashboardService.getDashboardSummary().subscribe({
      next: (response) => {
        this.summary = response.data;
        this.loading = false;
      },
      error: (error) => {
        this.message.error('Có lỗi xảy ra khi tải thông tin tổng quan');
        this.loading = false;
      }
    });
  }

  updateTime(): void {
    this.currentTime = new Date();
  }
}
