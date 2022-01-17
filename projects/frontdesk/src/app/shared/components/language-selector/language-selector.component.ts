import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Language } from '@frontdesk/core/interfaces/language';
import { LanguageService } from '@frontdesk/core/services/language.service';

@Component({
  selector: 'vvtk-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {

  selectedLanguage = 'global';
  languages: Language[];
  @Output() selectionChange: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
    this.languages = LanguageService.languageList;
    this.selectionChange.emit(this.selectedLanguage);
  }

}
