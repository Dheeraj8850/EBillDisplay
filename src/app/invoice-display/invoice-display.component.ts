
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Invoice } from '../invoice';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlashVideoPopupComponent } from '../flash-video-popup/flash-video-popup.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-invoice-display',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FlashVideoPopupComponent, PdfViewerModule],
  templateUrl: './invoice-display.component.html',
  styleUrls: ['./invoice-display.component.css']
})
export class InvoiceDisplayComponent implements OnInit, OnDestroy {
  invoice: Invoice | null = null;
  mobileNumber: string | null = null;

  loading = false;
  errorMessage = '';
  showPopup = true;

  headerImageList: string[] = [];
  footerImageList: string[] = [];

  userRating = 0;
  maxStars = 5;
  hasRated = false;

  pdfUrl: string = '';

  faFacebook = faFacebook;
  faInstagram = faInstagram;
  faTwitter = faTwitter;

  socialLinks = {
    facebook: 'https://facebook.com/zudio',
    instagram: 'https://instagram.com/zudio',
    twitter: 'https://twitter.com/zudio'
  };

  // New variables to track current image index & progress width for header and footer
  currentHeaderIndex = 0;
  currentFooterIndex = 0;
  progressWidth = 0; // progress bar % width for header
  footerProgressWidth = 0; // progress bar % width for footer

  // Intervals for slideshow
  private headerInterval: any;
  private footerInterval: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {    
    this.route.queryParams.subscribe(params => {
      this.mobileNumber = params['mobile'];
      if (this.mobileNumber) {
        this.fetchInvoice();
      }else {
        this.invoice = null; // or optionally set to a default/test invoice object
        this.pdfUrl = ''; // No PDF loaded
      }
    });

    this.headerImageList = ['assets/img1.jpg', 'assets/img2.jpg', 'assets/img3.jpg'];
    this.footerImageList = ['assets/img3.jpg', 'assets/img2.jpg', 'assets/img1.jpg'];

    if (!sessionStorage.getItem('popupShown')) {
      this.showPopup = true;
      setTimeout(() => {
        sessionStorage.setItem('popupShown', 'true');
      }, 0);
    } else {
      this.showPopup = true;
    }

    // Start slideshows for header and footer
    this.startHeaderSlideshow();
    this.startFooterSlideshow();
  }

  // Slideshow for header images
  startHeaderSlideshow() {
    const duration = 3000; // 3 seconds

    // Reset progress bar and animate for first image
    this.resetHeaderProgressBar(duration);

    this.headerInterval = setInterval(() => {
      // Move to next image, looping to 0 after last image
      this.currentHeaderIndex = (this.currentHeaderIndex + 1) % this.headerImageList.length;

      // Restart progress bar animation
      this.resetHeaderProgressBar(duration);
    }, duration);
  }

  resetHeaderProgressBar(duration: number) {
    this.progressWidth = 0;
    // Trigger animation smoothly
    setTimeout(() => {
      this.progressWidth = 100;
    }, 50); // small delay to trigger CSS transition
  }

  // Slideshow for footer images
  startFooterSlideshow() {
    const duration = 3000;

    this.resetFooterProgressBar(duration);

    this.footerInterval = setInterval(() => {
      this.currentFooterIndex = (this.currentFooterIndex + 1) % this.footerImageList.length;
      this.resetFooterProgressBar(duration);
    }, duration);
  }

  resetFooterProgressBar(duration: number) {
    this.footerProgressWidth = 0;
    setTimeout(() => {
      this.footerProgressWidth = 100;
    }, 50);
  }

  setRating(star: number): void {
    this.userRating = star;
    this.hasRated = true;
  }

  fetchInvoice() {
    this.loading = true;
    this.errorMessage = '';
    this.http.get<Invoice>(`https://localhost:7103/api/Invoices/${this.mobileNumber}`).subscribe({
      next: data => {
        this.invoice = data;
        this.loading = false;
        this.loadPdfBlob();
      },
      error: () => {
        this.invoice = null;
        this.loading = false;
        this.errorMessage = 'Failed to fetch invoice. Please try again later.';
      }
    });
  }

  loadPdfBlob() {
    const url = `https://localhost:7103/api/Invoices/GetInvoicePdf/${this.mobileNumber}`;
    this.http.get(url, { responseType: 'blob' }).subscribe({
      next: blob => {
        this.pdfUrl = URL.createObjectURL(blob);
      },
      error: () => {
        this.errorMessage = 'Unable to load invoice PDF.';
      }
    });
  }

  downloadPDF() {
    const url = `https://localhost:7103/api/Invoices/GetInvoicePdf/${this.mobileNumber}`;
    this.http.get(url, { responseType: 'blob' }).subscribe({
      next: blob => {
        const blobURL = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobURL;
        a.download = `${this.mobileNumber}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobURL);
      },
      error: () => {
        this.errorMessage = 'Failed to download PDF.';
      }
    });
  }

  ngOnDestroy() {
    if (this.headerInterval) {
      clearInterval(this.headerInterval);
    }
    if (this.footerInterval) {
      clearInterval(this.footerInterval);
    }
  }
}
