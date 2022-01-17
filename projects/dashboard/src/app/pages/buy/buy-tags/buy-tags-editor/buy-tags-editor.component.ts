import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BuyTag } from '../../../../vvtk-core/classes/buyTag';
import { Language } from '../../../../vvtk-core/classes/language';
import { SharedService } from '../../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../../vvtk-core/services/vvtk.service';

@Component({
  selector: 'vvtk-buy-tags-editor',
  templateUrl: './buy-tags-editor.component.html',
  styleUrls: ['./buy-tags-editor.component.scss']
})
export class BuyTagsEditorComponent implements OnInit {
  languages: Language[];
  id: number;
  tag: BuyTag;
  isLoading = false;
  constructor(
    private dialogRef: MatDialogRef<BuyTagsEditorComponent, boolean>,
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
        this.getBuyTag();
      }
      setTimeout(() => {
        getLanguages$.unsubscribe();
      }, 1);
    });
  }

  getBuyTag() {
    this.vvtkService.get(
      {
        path: `api/Buy/Tag/${this.id}`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();
          this.languages.forEach((lang, idx) => {
            if (body[lang.code]) {
              this.tag[lang.code] = body[lang.code];
            }
          });
        }
      }
    );
  }

  save() {
    this.isLoading = true;
    const data: BuyTag = {};
    this.languages.forEach((lang, idx) => {
      if (this.tag[lang.code] !== '') {
        data[lang.code] = this.tag[lang.code];
      }
    });

    if (this.tag.id === 0) {
      this.vvtkService.post(
        {
          path: `api/Buy/Tag`,
          disableLanguage: true
        },
        data,
        {
          next: () => {
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
          path: `api/Buy/Tag/${this.tag.id}`,
          disableLanguage: true
        },
        data,
        {
          next: () => {
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
