import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-loan-calculator',
  standalone: false,
  templateUrl: './loan-calculator.component.html',
  styleUrls: ['./loan-calculator.component.scss']
})
export class LoanCalculatorComponent implements OnInit {
  loanForm: FormGroup;
  monthlyPayment: number = 0;
  totalPayment: number = 0;
  totalInterest: number = 0;
  paymentSchedule: any[] = [];

  constructor(private fb: FormBuilder) {
    this.loanForm = this.fb.group({
      loanAmount: ['', [Validators.required, Validators.min(1)]],
      loanTerm: ['', [Validators.required, Validators.min(1)]],
      interestRate: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loanForm.valueChanges.subscribe(() => {
      if (this.loanForm.valid) {
        this.calculateLoan();
      }
    });
  }

  // Định dạng số tiền
  numberFormatter = (value: number): string => {
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  numberParser = (value: string): number => {
    return Number(value.replace(/\$\s?|(,*)/g, ''));
  };

  // Định dạng phần trăm
  percentFormatter = (value: number): string => {
    return `${value}%`;
  };

  percentParser = (value: string): number => {
    return Number(value.replace('%', ''));
  };

  calculateLoan(): void {
    const amount = this.loanForm.get('loanAmount')?.value;
    const months = this.loanForm.get('loanTerm')?.value;
    const annualRate = this.loanForm.get('interestRate')?.value;

    // Chuyển lãi suất năm sang tháng
    const monthlyRate = annualRate / 12 / 100;

    // Tính PMT (Payment)
    this.monthlyPayment = amount * monthlyRate * Math.pow(1 + monthlyRate, months)
      / (Math.pow(1 + monthlyRate, months) - 1);

    this.totalPayment = this.monthlyPayment * months;
    this.totalInterest = this.totalPayment - amount;

    // Tính lịch trả nợ
    this.calculatePaymentSchedule(amount, months, monthlyRate);
  }

  calculatePaymentSchedule(amount: number, months: number, monthlyRate: number): void {
    let balance = amount;
    let schedule = [];

    for (let month = 1; month <= months; month++) {
      const interest = balance * monthlyRate;
      const principal = this.monthlyPayment - interest;
      balance = balance - principal;

      schedule.push({
        month: month,
        payment: this.monthlyPayment,
        principal: principal,
        interest: interest,
        balance: balance > 0 ? balance : 0
      });
    }

    this.paymentSchedule = schedule;
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  }
}
