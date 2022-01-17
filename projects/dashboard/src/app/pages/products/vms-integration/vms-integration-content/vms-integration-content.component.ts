import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DynamicTemplatePageOption } from 'projects/dashboard/src/app/vvtk-core/classes/dynamicTemplate';
import { TabTemplates } from 'projects/dashboard/src/app/vvtk-core/classes/template';
import { first } from 'rxjs/operators';


@Component({
  selector: 'vvtk-vms-integration',
  templateUrl: './vms-integration-content.component.html',
  styleUrls: ['./vms-integration-content.component.scss']
})

export class VMSintegrationContentComponent implements OnInit {
  opts: DynamicTemplatePageOption = {
    id: 0,
    title: 'VMSintegration',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'VMSintegration',
    apis: {
      get: 'api/Product/VMSintegration',
      post: 'api/Product/VMSintegration',
      patch: 'api/Product/VMSintegration'
    }
  };

  data: TabTemplates;

  constructor(
    private route: ActivatedRoute
  ) {
    this.data = {
      id: 0,
      tabName: '',
      anchorUrl: '',
      templates: [],
      content: '',
      sheet: null
    };
    this.route.params.pipe(first()).subscribe(param => {
      this.opts.id = +param.id;
    }).unsubscribe();
  }

  ngOnInit() { }

}
