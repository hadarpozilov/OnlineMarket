import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout-dialog',
  templateUrl: './checkout-dialog.component.html',
  styleUrls: ['./checkout-dialog.component.css'],
})
export class CheckoutDialogComponent implements OnInit {

  ngOnInit(): void {}

  generate() {
    alert("תודה שבחרת בנו")
  }
}

