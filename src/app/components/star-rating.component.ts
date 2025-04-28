import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class='star-rating'>
      @for (star of [1, 2, 3, 4, 5]; track star) {
        <span 
          class="star" 
          [class.active]="star <= (scoreSig() || 0)"
          (click)="onRatingChange(star)"
          [style.cursor]="'pointer'">
          ★
        </span>
      }
    </div>
  `,
  styles: [`  
    .star-rating {
      font-size: 24px;
    }
    
    .star {
      color: #ccc;
      transition: color 0.2s;
      
      &.active {
        color: #ffc107;
      }
      
      &:hover:not(.readonly) {
        color: #ffc107;
      }
    }
  `]
})
export class StarRatingComponent {
  public scoreSig = input<number | null>(null, { alias: 'score' });
  public ratingChange = output<number>();
  
  onRatingChange(value: number): void {
      this.ratingChange.emit(value);
  }
}