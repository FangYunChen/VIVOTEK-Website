import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlbumComponent } from '../../../shared/components/album/album.component';
import { Event } from '../../../vvtk-core/classes/event';
import { SharedService } from '../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../vvtk-core/services/vvtk.service';
import { VvtkApiService } from '../../../vvtk-core/services/vvtk-api.service';
import { finalize } from 'rxjs/operators';

declare var moment: any;

@Component({
  selector: 'vvtk-event-content',
  templateUrl: './event-content.component.html',
  styleUrls: ['./event-content.component.scss']
})
export class EventContentComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;

  @ViewChild('album') album: AlbumComponent;

  selectedLanguage$: Subscription;

  id: number;
  data: Event;
  status: boolean;
  startAt: Date;
  endAt: Date;

  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private vvtkApiService: VvtkApiService,
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.data = {
      title: '',
      image: {
        src: '',
        alt: '',
        title: ''
      },
      logo: {
        src: '',
        alt: '',
        title: ''
      },
      boothUrl: {
        url: '',
        title: ''
      },
      startAt: '',
      endAt: '',
      boothNumber: '',
      status: 1,
      content: '',
      address: '',
      album: []
    };
    this.status = true;
  }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;

    const routeParams$ = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getSelectedLanguage();
      setTimeout(() => {
        routeParams$.unsubscribe();
      }, 1);
    });
  }

  getSelectedLanguage() {
    this.selectedLanguage$ = this.sharedService.selectedLanguage$.subscribe(
      selectedLanguage => {
        if (this.id > 0) {
          this.getData();
        }
      }
    );
  }

  getData() {
    this.vvtkService.get(
      {
        path: `api/Event/${this.id}`
      },
      {
        next: resp => {
          const body = resp.json();

          this.data = body;
          this.album.setAlbum(this.data.album);
          this.startAt = new Date(this.data.startAt);
          this.endAt = new Date(this.data.endAt);
          this.status = body.status === 1;
        }
      }
    );
  }

  save() {
    this.isLoading = true;
    this.data.album = this.album.getAlbum();
    this.data.startAt = moment(this.startAt).format('YYYY-MM-DD');
    this.data.endAt = moment(this.endAt).format('YYYY-MM-DD');
    this.data.status = this.status ? 1 : 0;
    if (this.id === 0) {
      this.vvtkService.post(
        {
          path: `api/Event`,
          language: 'global'
        },
        this.data,
        {
          next: resp => {
            this.router.navigate(['/events/list']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    } else {
      this.vvtkService.patch(
        {
          path: `api/Event/${this.id}`
        },
        this.data,
        {
          next: resp => {
            this.router.navigate(['/events/list']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    }
  }

  logoFileSelect($event) {
    const file: File = $event.target.files[0];
    const myReader: FileReader = new FileReader();

    this.data.logo.title = file.name;
    this.data.logo.alt = file.name;

    myReader.onloadend = e => {
      this.data.logo.src = myReader.result as any;
      $event.target.value = null;
    };
    myReader.readAsDataURL(file);
  }

  imgFileSelect($event) {
    const file: File = $event.target.files[0];
    this.data.image.title = file.name;
    this.data.image.alt = file.name;
    this.isLoading = true;

    this.vvtkApiService.uploadFile(file, `Event/${file.name}`)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          $event.target.value = null;
        })
      )
      .subscribe(
        x => this.data.image.src = x.link
      );
  }

  typeof(obj) {
    return typeof obj;
  }

  minDate() {
    if (!this.startAt) {
      return new Date(1990, 0, 1);
    }
    return new Date(this.startAt);
  }

  maxDate() {
    if (!this.endAt) {
      return new Date(9999, 0, 1);
    }
    return new Date(this.endAt);
  }

  ngOnDestroy() {
    if (this.selectedLanguage$) {
      this.selectedLanguage$.unsubscribe();
    }
  }
}
