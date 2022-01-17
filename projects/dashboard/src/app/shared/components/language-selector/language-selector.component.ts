import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Language } from '../../../vvtk-core/classes/language';
import { SharedService } from '../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../vvtk-core/services/vvtk.service';

@Component({
  selector: 'vvtk-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {
  selectedLanguage: string;
  languages: Language[];

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private vvtkService: VvtkService
  ) {}

  ngOnInit() {
    this.getLanguages();
  }

  getLanguages() {
    const getLanguages$ = this.sharedService.languages$.subscribe(languages => {
      this.languages = languages;
      if (this.languages.length === 0) {
        this.vvtkService.setLanguages();
      } else {
        this.getSelectedLanguage();

        setTimeout(() => {
          getLanguages$.unsubscribe();
        }, 1);
      }
    });
  }

  getSelectedLanguage() {
    const getSelectedLanguage$ = this.sharedService.selectedLanguage$.subscribe(
      selectedLanguage => {
        this.selectedLanguage = selectedLanguage;

        setTimeout(() => {
          getSelectedLanguage$.unsubscribe();
        }, 1);
      }
    );
  }

  doChange() {
    this.sharedService.setSelectedLanguage(this.selectedLanguage);
    // this.reload();
  }

  reload() {
    const path = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(path, { skipLocationChange: true });
    });
  }
}
