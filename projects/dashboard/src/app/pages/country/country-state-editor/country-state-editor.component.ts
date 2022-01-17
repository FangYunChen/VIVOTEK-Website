import { Component, OnInit } from '@angular/core';
import { States } from '../../../vvtk-core/classes/continent';
import { SharedService } from '../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../vvtk-core/services/vvtk.service';

@Component({
  selector: 'vvtk-country-state-editor',
  templateUrl: './country-state-editor.component.html',
  styleUrls: ['./country-state-editor.component.scss']
})
export class CountryStateEditorComponent implements OnInit {
  pageIsEditable: boolean;

  node: any;
  data: States;
  isLoading = false;
  constructor(
    private vvtkService: VvtkService,
    private sharedService: SharedService
  ) {
    this.data = {
      id: 0,
      countryId: 0,
      name: '',
      displayOrder: 999,
      isEnabled: true
    };
  }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
  }

  setNode(node: any) {
    this.node = node;
    this.data = {
      id: this.node.data.dbData.id,
      countryId: this.node.data.dbData.countryId,
      name: this.node.data.dbData.name,
      displayOrder: this.node.data.dbData.displayOrder,
      isEnabled: this.node.data.dbData.isEnabled
    };
  }

  save() {
    this.isLoading = true;
    if (this.data.id === 0) {
      this.vvtkService.post(
        {
          path: `api/States`,
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
          path: `api/States/${this.data.id}`,
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
