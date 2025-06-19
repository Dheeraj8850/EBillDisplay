import { CommonModule, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {  FormsModule} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile-input',
  imports: [FormsModule, CommonModule],
  templateUrl: './mobile-input.component.html',
  styleUrls: ['./mobile-input.component.css']
})
export class MobileInputComponent implements OnInit {

   mobileNumber: string = '';
   errorMessage: string = '';
   invoice: any;

  constructor(private router: Router, private http: HttpClient) {}
  ngOnInit(): void {
   
  }

  onSubmit() {
  this.errorMessage = '';
  this.invoice = null;

  if (!this.mobileNumber) {
    this.errorMessage = 'Please enter a mobile number';
    return ;
  }

  this.http.get(`https://localhost:7103/api/Invoices?mobile=${this.mobileNumber}`)
    .subscribe({
      next: (data) => {
        console.log('Invoice data:', data);
        this.invoice = data;
        this.router.navigate(['/invoice'], { queryParams: { mobile: this.mobileNumber } });
      },
      error: (err) => {
        console.error('Error fetching invoice:', err);
        this.errorMessage = 'No invoice found for this mobile number.';
      }
    });
    
}
}
