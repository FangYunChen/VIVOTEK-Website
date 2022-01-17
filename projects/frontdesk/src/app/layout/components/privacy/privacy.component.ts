import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { matSnackBarAnimations, MatSnackBarRef } from '@angular/material';

@Component({
  selector: 'vvtk-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {
  constructor(private snackBarRef: MatSnackBarRef<PrivacyComponent>) {}

  ngOnInit() {}

  ok() {

    this.snackBarRef.dismissWithAction();
  }
}
