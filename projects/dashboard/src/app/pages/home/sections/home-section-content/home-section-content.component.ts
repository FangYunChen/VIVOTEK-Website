import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HomeSection } from '../../../../vvtk-core/classes/homeSection';
import { SharedService } from '../../../../vvtk-core/services/shared.service';
import { ToolsService } from '../../../../vvtk-core/services/tools.service';
import { VvtkService } from '../../../../vvtk-core/services/vvtk.service';
import { VvtkApiService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk-api.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'vvtk-home-section-content',
  templateUrl: './home-section-content.component.html',
  styleUrls: ['./home-section-content.component.scss']
})
export class HomeSectionContentComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;

  selectedLanguage$: Subscription;
  selectedLanguage: string;

  id: number;
  data: HomeSection;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private vvtkApiService: VvtkApiService,
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private toolsService: ToolsService,
    private router: Router
  ) {
    this.data = {
      title: '',
      type: 'Cards',
      more: {
        href: '',
        text: ''
      },
      items: []
    };
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
        this.selectedLanguage = selectedLanguage;
        if (this.id > 0) {
          this.getData();
        }
      }
    );
  }
  getData() {
    this.vvtkService.get(
      {
        path: `api/Home/Section/${this.id}`
      },
      {
        next: resp => {
          const body = resp.json();
          this.data = body;
        }
      }
    );
  }

  save() {
    this.isLoading = true;
    this.data.items.forEach((item, idx) => {
      if (item.video && item.video !== '') {
        item.img = {
          src: '',
          title: '',
          alt: ''
        };
      }
    });

    if (this.id === 0) {
      this.vvtkService.post(
        {
          path: `api/Home/Section`,
          language: 'global'
        },
        this.data,
        {
          next: resp => {
            this.router.navigate(['/home/sections/list']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    } else {
      this.vvtkService.patch(
        {
          path: `api/Home/Section/${this.id}`
        },
        this.data,
        {
          next: resp => {
            this.router.navigate(['/home/sections/list']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    }
  }

  changeType() {
    if (this.data.type === 'Cards' && this.data.items.length > 3) {
      this.data.items.splice(3);
    }
  }

  itemImgFileSelect($event, i: number) {
    const file: File = $event.target.files[0];
    this.data.items[i].img.title = file.name;
    this.data.items[i].img.alt = file.name;
    this.isLoading = true;

    this.vvtkApiService.uploadFile(file, `Home/Section/${file.name}`)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          $event.target.value = null;
        })
      )
      .subscribe(
        x =>  this.data.items[i].img.src  = x.link
      );
  }

  addItem(idx: number) {
    if (
      this.data.items.length >= 4 ||
      (this.data.items.length >= 3 && this.data.type === 'Cards')
    ) {
      return;
    }
    this.toolsService.lockScrollTop();

    const clone = this.toolsService.copyObject(this.data.items);
    clone.splice(idx, 0, {
      title: '',
      description: '',
      href: '',
      img: {
        src: '',
        alt: '',
        title: ''
      },
      video: ''
    });
    this.data.items = clone;
  }

  deleteItem(i: number) {
    this.data.items.splice(i, 1);
    this.data.items = this.toolsService.copyObject(this.data.items);
  }

  typeof(obj) {
    return typeof obj;
  }

  ngOnDestroy() {
    if (this.selectedLanguage$) {
      this.selectedLanguage$.unsubscribe();
    }
  }
}
