import { Component, OnInit } from '@angular/core';
import { Country } from '../../../vvtk-core/classes/continent';
import { Language } from '../../../vvtk-core/classes/language';
import { SharedService } from '../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../vvtk-core/services/vvtk.service';

@Component({
  selector: 'vvtk-country-country-editor',
  templateUrl: './country-country-editor.component.html',
  styleUrls: ['./country-country-editor.component.scss']
})
export class CountryCountryEditorComponent implements OnInit {
  pageIsEditable: boolean;

  node: any;
  data: Country;
  languages: Language[] = [];
  isLoading = false;

  constructor(
    private vvtkService: VvtkService,
    private sharedService: SharedService
  ) {
    this.data = {
      id: 0,
      continentId: 0,
      name: '',
      lang: 'global',
      isReal: true,
      displayOrder: 999,
      isEnabled: true,
      isLanguage: false
    };
  }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.getLanguages();
  }

  getLanguages() {
    const getLanguages$ = this.sharedService.languages$.subscribe(languages => {
      this.languages = languages;
      if (this.languages.length === 0) {
        this.vvtkService.setLanguages();
      } else {
        setTimeout(() => {
          getLanguages$.unsubscribe();
        }, 1);
      }
    });
  }

  setNode(node: any) {
    this.node = node;
    console.log(this.node.data.dbData);
    this.data = {
      id: this.node.data.dbData.id,
      continentId: this.node.data.dbData.continentId,
      name: this.node.data.dbData.name,
      lang: this.node.data.dbData.lang,
      isReal: this.node.data.dbData.isReal,
      displayOrder: this.node.data.dbData.displayOrder,
      isEnabled: this.node.data.dbData.isEnabled,
      isLanguage: this.node.data.dbData.isLanguage
    };
  }

  getLangName(code: string) {
    const find = this.languages.find(lang => {
      return lang.code === code;
    });
    return find ? find.name : '';
  }

  save() {
    this.isLoading = true;
    if (this.data.id === 0) {
      this.vvtkService.post(
        {
          path: `api/Countries`,
          disableLanguage: true
        },
        this.data,
        {
          next: resp => {
            const body = resp.json();
            this.data.id = body.id;
            this.node.setTitle(this.data.name);
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
          path: `api/Countries/${this.data.id}`,
          disableLanguage: true
        },
        this.data,
        {
          next: resp => {
            this.node.setTitle(this.data.name);
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
}
