import { Component, OnInit, Input } from '@angular/core';

declare var $: any;

@Component({
  selector: 'vvtk-model-rich-text',
  templateUrl: './model-rich-text.component.html',
  styleUrls: ['./model-rich-text.component.scss']
})
export class ModelRichTextComponent implements OnInit {
  @Input()
  content;

  constructor() { }

  ngOnInit() {
    this.NonBreakingHyphen(this.content.htmlContent);
  }

  NonBreakingHyphen(content) {
    if (this.isHTML(content)) {
      const tbody = $(content).find('tbody');
      if (tbody) {
        const anchors = tbody.find('td > a');
        $.each(anchors, (idx, anchor) => {
          const currentAnchor = $(anchor);
          let text = currentAnchor.text();
          text = text.replace('-', '&#8209;');
          currentAnchor.text(text);
        });
      }
    }
  }

  isHTML(str) {
    const doc = new DOMParser().parseFromString(str, 'text/html');
    return Array.from(doc.body.childNodes).some(node => node.nodeType === 1);
  }
}
