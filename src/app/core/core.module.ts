import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
//toster module vvi
import { ToastrModule } from 'ngx-toastr';
//image slider
import { NgImageSliderModule } from 'ng-image-slider';
import { ImageSliderModule } from '../Shared/imageSlider/imageSlider.module';
//http module vvi
import { HttpClientModule } from '@angular/common/http';
//form module vvi
import { FormsModule } from '@angular/forms';
//browser animation
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//owl crousal module for silder
import { CarouselModule } from 'ngx-owl-carousel-o';
//ionic
import { IonicModule } from '@ionic/angular';
//angular material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
//flex
import { FlexLayoutModule } from '@angular/flex-layout';
import { ImgMagnifier } from 'ng-img-magnifier/lib/ng-img-magnifier.module';
import { NgMagnizoomModule } from 'ng-magnizoom';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { SafeUrlPipe } from '../Shared/pipe/safeUrl';

@NgModule({
  declarations: [SafeUrlPipe],
  imports: [
    CommonModule,
    CoreRoutingModule,
    ToastrModule.forRoot(),
    NgImageSliderModule,
    ImageSliderModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    CarouselModule,
    IonicModule.forRoot(),
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSelectModule,
    FormsModule,
    MatDividerModule,
    MatSidenavModule,
    MatListModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    FlexLayoutModule,
    NgxImageZoomModule,
    InfiniteScrollModule,
  ],
  exports: [
    ToastrModule,
    NgImageSliderModule,
    ImageSliderModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    CarouselModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSelectModule,
    FormsModule,
    MatDividerModule,
    MatSidenavModule,
    MatListModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    FlexLayoutModule,
    NgxImageZoomModule,
    SafeUrlPipe,
    InfiniteScrollModule,
  ],
})
export class CoreModule {}
