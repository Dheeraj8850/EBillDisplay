import { Routes } from '@angular/router';
import { MobileInputComponent } from './mobile-input/mobile-input.component';
import { InvoiceDisplayComponent } from './invoice-display/invoice-display.component';
import { FlashVideoPopupComponent } from './flash-video-popup/flash-video-popup.component';

export const routes: Routes = [
    {path:'mobile', component:MobileInputComponent},
    {path:'invoice',component:InvoiceDisplayComponent},
    { path:'videopop', component:FlashVideoPopupComponent },
    {path:'**',redirectTo:'/mobile', pathMatch:'full'}
    
];