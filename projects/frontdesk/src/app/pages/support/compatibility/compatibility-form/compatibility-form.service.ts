import { Injectable } from '@angular/core';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';
import { FormData } from '@frontdesk/core/interfaces/compatibility';

@Injectable({
  providedIn: 'root'
})
export class CompatibilityFormService {

  constructor(private vvtkApiService: VvtkApiService) { }

  getContinent() {
    return this.vvtkApiService.get({path: 'api/Continents', disableLanguage: true});
  }
  getCountry(id: number) {
    return this.vvtkApiService.get({path: `api/Continents/${id}/Countries`, disableLanguage: true});
  }
  postData(data: FormData) {
    return this.vvtkApiService.post({path: 'api/supportcl/CompatibilitySuggestions', disableLanguage: true}, data);
  }
}
