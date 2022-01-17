import { Component, OnInit } from '@angular/core';
import { StakeholderFAQCategory } from '../../../../../vvtk-core/classes/stakeholderFaq';
import { SharedService } from '../../../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../../../vvtk-core/services/vvtk.service';

@Component({
  selector: 'vvtk-investors-stakeholder-faq-category-editor',
  templateUrl: './investors-stakeholder-faq-category-editor.component.html',
  styleUrls: ['./investors-stakeholder-faq-category-editor.component.scss']
})
export class InvestorsStakeholderFaqCategoryEditorComponent implements OnInit {
  pageIsEditable: boolean;

  data: StakeholderFAQCategory;
  node: any;

  constructor(
    private vvtkService: VvtkService,
    private sharedService: SharedService
  ) {
    this.data = {
      name: ''
    };
  }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
  }

  setNode(node) {
    this.node = node;
    this.data = this.node.data.dbData;
  }

  save() {
    if (this.data.id === 0) {
      this.vvtkService.post(
        {
          path: `api/StakeholderFAQ/Category`,
          language: 'global'
        },
        this.data,
        {
          next: resp => {
            const body = resp.json();
            this.data.id = body.id;
            this.node.setTitle(this.data.name);
            this.node.data.dbData = this.data;
            this.node.render();
          }
        }
      );
    } else {
      this.vvtkService.patch(
        {
          path: `api/StakeholderFAQ/Category/${this.data.id}`
        },
        this.data,
        {
          next: resp => {
            this.node.setTitle(this.data.name);
            this.node.data.dbData = this.data;
            this.node.render();
          }
        }
      );
    }
  }
}
