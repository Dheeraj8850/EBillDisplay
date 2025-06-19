import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MobileInputComponent } from "./mobile-input/mobile-input.component";
import { InvoiceDisplayComponent } from "./invoice-display/invoice-display.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RetailInvoice';
}
