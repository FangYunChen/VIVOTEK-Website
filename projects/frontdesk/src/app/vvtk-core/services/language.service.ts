import { Injectable } from '@angular/core';

import { Language } from '../interfaces/language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  static languageList: Language[];

  constructor() { }
}
