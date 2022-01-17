import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { MediaChange } from '@angular/flex-layout';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MediaReplayService } from '../sidenav/mediareplay/media-replay.service';

declare let $: any;
@Component({
  selector: 'vvtk-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav;

  private _mediaSubscription: Subscription;
  private _routerEventsSubscription: Subscription;

  sidenavOpen = true;
  sidenavMode = 'side';
  isMobile = false;

  constructor(
    private router: Router,
    private mediaReplayService: MediaReplayService
  ) {}

  ngOnInit() {
    // mat-select onkeydown 時，跳到對應的 option
    // 寫在這裡很奇怪，正確的做法應該是叫 material 更新
    // material 是有更新這個功能了，
    // 但是升級 material 的話，全站的 input 都要重寫...
    let selectKeyword = '';
    let selectKeywordTimer: NodeJS.Timer;
    $('body').on('keydown', '.mat-select-content', e => {
      selectKeyword = selectKeyword + String.fromCharCode(e.keyCode);
      if (selectKeywordTimer) {
        clearTimeout(selectKeywordTimer);
      }
      selectKeywordTimer = setTimeout(() => {
        selectKeyword = '';
      }, 1000);

      const options = $(e.currentTarget).find('.mat-option');
      options.removeClass('mat-active');
      const regex = new RegExp(`^${selectKeyword}`, 'i');
      for (const option of options) {
        if (regex.test($(option).text())) {
          $(option)
            .focus()
            .addClass('mat-active');
          break;
        }
      }
    });
    $('body').on('click', '.mat-select-content', e => {
      const options = $(e.currentTarget).find('.mat-option');
      options.removeClass('mat-active');
    });

    this._mediaSubscription = this.mediaReplayService.media$.subscribe(
      (change: MediaChange) => {
        const isMobile = change.mqAlias === 'xs' || change.mqAlias === 'sm';

        this.isMobile = isMobile;
        this.sidenavMode = isMobile ? 'over' : 'side';
        this.sidenavOpen = !isMobile;
      }
    );

    this._routerEventsSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && this.isMobile) {
        this.sidenav.close();
      }
    });
  }

  ngOnDestroy() {
    if (this._mediaSubscription) {
      this._mediaSubscription.unsubscribe();
    }
  }

  onActivate(e, scrollContainer) {
    scrollContainer.scrollTop = 0;
  }
}
