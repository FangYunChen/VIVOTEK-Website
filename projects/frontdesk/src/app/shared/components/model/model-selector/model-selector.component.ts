import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vvtk-model-selector',
  templateUrl: './model-selector.component.html',
  styleUrls: ['./model-selector.component.scss']
})
export class ModelSelectorComponent implements OnInit {
  @Input() content = '';
  @Input() templates = [];
  @Input() tableName = '';
  @Input() sheet = null;
  constructor() {}

  public setContent(content: string) {
    if (content) {
      content = content.split(/\r?\n/).join('<br/>');
    }
    return content;
  }

  public setTemplates(templates: any[]) {
    if (templates) {
      templates.forEach(template => {
        if (template && template.content) {
          template.content = template.content.split(/\r?\n/).join('<br/>');
        }
      });
    }
    return templates;
  }

  ngOnInit() {}
}
