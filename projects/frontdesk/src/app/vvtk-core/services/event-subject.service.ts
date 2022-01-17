import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventSubjectService {

  private eventMap: Map<string, Observable<any>> = new Map<string, Observable<any>>();

  constructor() { }

  getEventShare<T = any>(eventName: string, eventHandler: Observable<T>): Observable<T> {
    let eventShare = this.eventMap.get(eventName);

    if (!eventShare) {
      eventShare = eventHandler.pipe(share());
      this.eventMap.set(eventName, eventShare);
    }

    return eventShare;
  }
}
