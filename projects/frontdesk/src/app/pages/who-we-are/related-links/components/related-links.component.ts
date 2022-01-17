import { Component, OnInit } from '@angular/core';
import { VvtkService } from '@frontdesk/core/services/vvtk.service';

@Component({
  selector: 'vvtk-related-links',
  templateUrl: './related-links.component.html',
  styleUrls: ['./related-links.component.scss']
})
export class RelatedlinksComponent implements OnInit {
  _Content = { templates: [{ type: 0 }] };

  constructor(private vvtkService: VvtkService) { }

  ngOnInit() {
    this.vvtkService.getAbout('Relatedlinks', resp => {
      this._Content = resp.json() ? resp.json() : this._Content;
    });
  }
}
