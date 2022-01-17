import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SearchBarService {

  searchKeyword$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor() { }

}
