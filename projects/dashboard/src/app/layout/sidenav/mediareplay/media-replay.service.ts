import { Injectable } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable()
export class MediaReplayService {
  private _media$: ReplaySubject<MediaChange> = new ReplaySubject(1);

  constructor(media: MediaObserver) {
    media.media$.subscribe(res => this._media$.next(res), err => this._media$.error(err), () => this._media$.complete());
  }

  get media$(): Observable<MediaChange> {
    return this._media$.asObservable();
  }
}
