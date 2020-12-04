import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'po-gauge-container',
  templateUrl: './po-gauge-container.component.html'
})
export class PoGaugeContainerComponent implements OnInit, AfterViewInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    console.log('altura no init', this.elementRef.nativeElement.offsetHeight);
  }

  ngAfterViewInit(): void {
    console.log('altura no afterviewinit', this.elementRef.nativeElement.offsetHeight);
  }
}
