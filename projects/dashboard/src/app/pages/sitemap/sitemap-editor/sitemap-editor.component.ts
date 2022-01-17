import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { I18n, Sitemap } from '../../../vvtk-core/classes/sitemap';
import { SharedService } from '../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../vvtk-core/services/vvtk.service';
import { VvtkApiService } from '../../../vvtk-core/services/vvtk-api.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'vvtk-sitemap-editor',
  templateUrl: './sitemap-editor.component.html',
  styleUrls: ['./sitemap-editor.component.scss']
})
export class SitemapEditorComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;

  selectedLanguage$: Subscription;
  selectedLanguage: string;

  isLoading = false;

  rootType: string;
  data: Sitemap;
  i18n: I18n;
  node: any;
  constructor(
    private sharedService: SharedService,
    private vvtkApiService: VvtkApiService,
    private vvtkService: VvtkService
  ) {
    this.rootType = 'footer';
    this.i18n = {
      lang: 'global',
      title: '',
      url: '',
      image: '',
      description: ''
    };
  }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;

    this.getSelectedLanguage();
  }

  getSelectedLanguage() {
    this.selectedLanguage$ = this.sharedService.selectedLanguage$.subscribe(
      selectedLanguage => {
        this.selectedLanguage = selectedLanguage;
        if (this.node) {
          this.setNode(this.node, this.rootType);
        }
      }
    );
  }

  getData(id: number) {
    this.vvtkService.get(
      {
        path: `api/Sitemaps/${id}`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();

          this.data = body;
          const i18n = this.data.i18n.filter(lang => {
            return lang.lang === this.selectedLanguage;
          });
          if (i18n.length > 0) {
            this.i18n = i18n[0];
          } else {
            this.i18n = {
              lang: this.selectedLanguage,
              title: this.data.title,
              url: this.data.url,
              image: this.data.image,
              description: this.data.description
            };
            this.data.i18n.push(this.i18n);
          }
        }
      }
    );
  }

  setNode(node: any, rootType: string) {
    this.rootType = rootType;
    this.i18n = {
      lang: this.selectedLanguage,
      title: '',
      url: '',
      image: '',
      description: ''
    };
    this.node = node;
    this.data = this.node.data.dbData;
    if (this.data.id > 0) {
      this.getData(this.data.id);
    }
  }

  imgFileSelect($event) {
    const file: File = $event.target.files[0];
    this.isLoading = true;

    this.vvtkApiService.uploadFile(file, `Sitemap/${file.name}`)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          $event.target.value = null;
        })
      )
      .subscribe(
        x => this.i18n.image = x.link
      );
  }

  save() {
    this.isLoading = true;

    const i18n = this.data.i18n.filter(lang => {
      return lang.lang === this.selectedLanguage;
    });
    if (i18n.length > 0) {
      i18n[0] = this.i18n;
    } else {
      this.data.i18n.push(this.i18n);
    }
    if (this.data.id === 0 || this.selectedLanguage === 'global') {
      this.data.title = this.i18n.title;
      this.data.url = this.i18n.url;
      this.data.image = this.i18n.image;
      this.data.description = this.i18n.description;
    }
    if (this.data.id === 0) {
      this.vvtkService.post(
        {
          path: `api/Sitemaps`,
          disableLanguage: true
        },
        this.data,
        {
          next: resp => {
            const body = resp.json();
            this.data.id = body.id;
            this.node.setTitle(this.i18n.title);
            this.node.data.dbData = this.data;
            this.node.render();
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    } else {
      this.vvtkService.patch(
        {
          path: `api/Sitemaps/${this.data.id}`
        },
        this.data,
        {
          next: resp => {
            this.node.setTitle(this.i18n.title);
            this.node.data.dbData = this.data;
            this.node.render();
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    }
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
