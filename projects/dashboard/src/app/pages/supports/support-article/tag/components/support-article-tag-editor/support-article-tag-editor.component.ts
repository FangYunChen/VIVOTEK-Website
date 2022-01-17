import { Component, OnInit, Inject } from '@angular/core';
import { Language } from 'projects/dashboard/src/app/vvtk-core/classes/language';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SharedService } from 'projects/dashboard/src/app/vvtk-core/services/shared.service';
import { VvtkApiService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk-api.service';
import { finalize } from 'rxjs/operators';
import { Tags, TagLang } from 'projects/dashboard/src/app/vvtk-core/interface/support-article';



@Component({
  selector: 'vvtk-support-article-tag-editor',
  templateUrl: './support-article-tag-editor.component.html',
  styleUrls: ['./support-article-tag-editor.component.scss']
})

export class SupportArticleTagEditorComponent implements OnInit {
  languages: Language[];
  id: number;
  tag: Tags;
  isLoading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SupportArticleTagEditorComponent>,
    private vvtkApiService: VvtkApiService,
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
        this.getTagLangsList();
      }

      setTimeout(() => {
        getLanguages$.unsubscribe();
      }, 1);
    });
  }

  getTagLangsList() {
    this.isLoading = true;
    this.vvtkApiService.get<any>({
      path: `api/support/tags/${this.id}`,
      disableLanguage: true
    }).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(res =>
      this.languages.forEach((lang, idx) => {
        if (res[lang.code]) {
          this.tag[lang.code] = res[lang.code].name;
        }
      })
    );
  }

  save() {
    this.isLoading = true;
    const data: TagLang[] = [];
    this.languages.forEach((lang, idx) => {
      if (this.tag[lang.code] !== '') {
        const tagLang: TagLang = {
          lang: lang.code,
          name: this.tag[lang.code]
        };

        data.push(tagLang);
      }
    });

    if (this.tag.id === 0) {
      this.vvtkApiService.post(
        {
          path: `api/support/tags`,
          disableLanguage: true
        },
        data
      ).pipe(
        finalize(() => {
          this.isLoading = false;
        })
      ).subscribe(
        _ => this.dialogRef.close(true)
      );
    } else {
      this.vvtkApiService.patch(
        {
          path: `api/support/tags/${this.tag.id}`,
          disableLanguage: true
        },
        data
        ).pipe(
          finalize(() => {
            this.isLoading = false;
          })
        ).subscribe(
          _ => this.dialogRef.close(true)
        );
    }
  }
}
