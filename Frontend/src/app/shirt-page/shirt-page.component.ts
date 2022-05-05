import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-shirt-page',
  templateUrl: './shirt-page.component.html',
  styleUrls: ['./shirt-page.component.scss'],
})
export class ShirtPageComponent implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  navigateToFormPage() {
    console.log('go to predict page');
    this.router.navigateByUrl('detail');
  }
  size() {
    console.log('ok');
    this.router.navigateByUrl('predict');
    console.log('okk');
  }
  measure() {
    console.log('ok');
    this.router.navigateByUrl('image');
  }
  tryon() {
    console.log('ok');
    this.router.navigateByUrl('predict');
  }
}
