import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Language } from '../../../../vvtk-core/classes/language';
import { NewsTag } from '../../../../vvtk-core/classes/newsTag';
import { SharedService } from '../../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../../vvtk-core/services/vvtk.service';

@Component({
  selector: 'vvtk-news-tags-editor',
  templateUrl: './news-tags-editor.component.html',
  styleUrls: ['./news-tags-editor.component.scss']
})
export class NewsTagsEditorComponent implements OnInit {
  languages: Language[];
  id: number;
  tag: NewsTag;
  isLoading = false;
  constructor(
    private dialogRef: MatDialogRef<NewsTagsEditorComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private vvtkService: VvtkService,
    private sharedService: SharedService
  ) {
    this.id = data.id;
    this.tag = {
      id: this.id,
      name: ''
    };
  }

  ngOnInit() {
    const getLanguages$ = this.sharedService.languages$.subscribe(languages => {
      this.languages = languages;
      this.languages.forEach((lang, idx) => {
        this.tag[lang.code] = '';
      });

      if (this.id !== 0) {
        this.getNewsTag();
      }
      setTimeout(() => {
        getLanguages$.unsubscribe();
      }, 1);
    });
  }

  getNewsTag() {
    this.vvtkService.get(
      {
        path: `api/News/Tag/${this.id}`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();
          this.languages.forEach((lang, idx) => {
            if (body[lang.code]) {
              this.tag[lang.code] = body[lang.code].name;
            }
          });
        }
      }
    );
  }

  save() {
    this.isLoading = true;
    const data: NewsTag = {};
    this.languages.forEach((lang, idx) => {
      if (this.tag[lang.code] !== '') {
        data[lang.code] = this.tag[lang.code];
      }
    });

    if (this.tag.id === 0) {
      this.vvtkService.post(
        {
          path: `api/News/Tag`,
          disableLanguage: true
        },
        data,
        {
          next: resp => {
            this.dialogRef.close(true);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    } else {
      this.vvtkService.patch(
        {
          path: `api/News/Tag/${this.tag.id}`,
          disableLanguage: true
        },
        data,
        {
          next: resp => {
            this.dialogRef.close(true);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    }
  }
}
