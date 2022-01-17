import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchBarService } from '@frontdesk/shared/services/search-bar.service';

@Component({
  selector: 'vvtk-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Input() placeholder;
  @Input() searchValue;
  @Output() searchKeyword = new EventEmitter<any>();
  @Output() clearKeyword = new EventEmitter<any>();

  constructor(private searchBarService: SearchBarService) { }

  ngOnInit() {
    this.searchBarService.searchKeyword$.next(null);
  }

  search() {
    this.searchBarService.searchKeyword$.next(this.searchValue);
    this.searchKeyword.emit(this.searchValue);
  }

  clear() {
    this.searchValue = null;
    this.searchBarService.searchKeyword$.next(null);
    this.clearKeyword.emit();
  }

}
