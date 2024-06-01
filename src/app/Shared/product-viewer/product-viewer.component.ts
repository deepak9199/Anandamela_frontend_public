import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-viewer',
  templateUrl: './product-viewer.component.html',
  styleUrls: ['./product-viewer.component.css'],
})
export class ProductViewerComponent {
  @Input() images: string[] = [];
  currentImage: string = '';

  ngOnInit() {
    // Set the initial image to the one at index 0
    if (this.images.length > 0) {
      this.showImage(this.images[0]);
    }
  }
  showImage(image: string): void {
    this.currentImage = image;
  }
}
