import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-flash-video-popup',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './flash-video-popup.component.html',
  styleUrls: ['./flash-video-popup.component.css']
})

export class FlashVideoPopupComponent implements OnInit {

@Input() flashVideoURL: string = '/assets/Softcon.mp4';
@Output() popupClosed = new EventEmitter<void>();

// flashVideoURL :string = '/assets/Softcon.mp4';
config: VideoConfig | null= null;

constructor(private http: HttpClient){}

closePopup(): void {
 // this.showPopup = false;
  console.log('Close button clicked');
  this.popupClosed.emit();  // Notify parent component
     
}

ngOnInit(): void {
   console.log('FlashVideoPopupComponent loaded', this.flashVideoURL);

}
}

interface VideoConfig{
  videoUrl:string;
  ctaText : string;
  flashVideoURL:string;
}