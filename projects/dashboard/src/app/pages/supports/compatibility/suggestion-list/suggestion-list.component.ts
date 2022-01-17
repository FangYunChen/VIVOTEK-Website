import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'vvtk-suggestion-list',
  templateUrl: './suggestion-list.component.html'
})
export class SuggestionListComponent implements OnInit {

  downloadLink = `${environment.apiUrl}/api/SupportCL/CompatibilitySuggestions/Export`;

  constructor() { }

  ngOnInit() { }

}
