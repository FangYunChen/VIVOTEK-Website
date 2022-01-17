import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'vvtk-software-download',
  templateUrl: './software-download.component.html',
  styleUrls: ['./software-download.component.scss']
})
export class SortwareDownloadComponent implements OnInit {

  constructor( private route: Router) { }

  ngOnInit() {
    this.route.navigateByUrl('/');
  }
}
