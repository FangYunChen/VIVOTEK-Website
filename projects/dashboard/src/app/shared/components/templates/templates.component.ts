import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SortablejsOptions } from 'angular-sortablejs';
import { Template } from '../../../vvtk-core/classes/template';
import { ToolsService } from '../../../vvtk-core/services/tools.service';

@Component({
  selector: 'vvtk-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {

  @ViewChild('form')
  form;

  templates: Template[] = [];

  @Input()
  includeSpecialType = false;

  @Input()
  types: number[];

  @Input()
  readOnly = false;

  @Input()
  path = 'Template';

  /** 大於200的都是特殊type不應該在一般template出現 */
  typeDescriptions: Map<number, string> = new Map([
    [0, ''],
    [1, 'Top-title, Middle-text, Bottom-hyperlink'],
    [2, 'Top-title, File download list'],
    [3, 'Top-title, Card list: Top-picture, Middle-title, Bottom-text & hyperlink'],
    [4, 'Top-title, Middle-text, Bottom-hyperlink, Right-video'],
    [5, 'Top-title, Middle-text, Bottom-hyperlink, Background picture'],
    [6, 'Top-title, Middle-text, Bottom-list with picture'],
    [7, 'Top-title, Middle-text, Bottom-hyperlink, Right-picture'],
    [8, 'Top-title, Middle-text, Bottom-hyperlink, Left-picture'],
    [9, 'Top-title, Horizontal-icons, Bottom-hyperlink'],
    [10, 'Top-title, Vertical-icons, Bottom-hyperlink'],
    [11, 'Top-title, Middle-text(Rich-editor), Bottom-hyperlink'],
    [12, 'Top title, List & Sub-list'],
    [13, 'Top-title, Middle-text, Bottom-hyperlink, Left-video'],
    [14, 'Top-title, Picture'],
    [15, 'Top-title, Video-title, Video'],
    [16, 'Top-title, Image'],
    [17, 'Banner'],
    [18, 'Top-title, Middle-text, Bottom-hyperlink, Bottom-video'],
    [19, 'Top-title, Middle-text, Bottom-hyperlink, Bottom-picture'],
    [20, '(Deprecated)Title-List, Background'],
    [21, 'Top-title, Many Columns With Title & Content'],
    [22, 'Top-title, Panel list: Top-picture, Middle-title, Bottom-text'],
    [23, 'Top-title, Event list'],
    [24, 'Top-title, Card list: Top-picture, Middle-title, Bottom-text(Rich-editor)'],
    [25, 'Mutiple-banner'],
    [26, 'Top-title, Carousel, Middle-text with picture'],
    [27, 'Top-title, Article-Management'],
    [28, 'Top-title, Content, Image with custom position'],
    [29, 'Top-title, Tabs, Video-title, Video'],
    [201, 'Product - Special Highlight'],
    [202, 'Product - Specification'],
  ]);

  specialTypeDescriptions: Map<number, string> = new Map([
  ]);

  groupOptionsTempalte: SortablejsOptions = {
    group: 'groupTempalte',
    handle: '.drag-handle',
    animation: 300
  };

  isLoading = false;

  constructor(private toolsService: ToolsService) { }

  ngOnInit() {
    if (!this.types) {
      this.types = [];
      this.typeDescriptions.forEach((value, key) => {
        if (this.includeSpecialType || key <= 200) {
          this.types.push(key);
        }
      });
    }
  }

  changeType(idx: number) {
    const clone: Template = this.toolsService.copyObject(this.templates[idx]);
    const newTemplate: Template = {
      showStyle: clone.showStyle,
      type: clone.type,
      title: '',
      subtitle: '',
      content: '',
      htmlContent: '',
      image: {
        src: '',
        alt: '',
        title: ''
      },
      images: [],
      linkImages: [],
      imagePosition: '',
      url: '',
      urlEnabled: true,
      cards: [],
      panels: [],
      columns: [],
      video: '',
      downloadList: [],
      icons: [],
      listItems: [],
      listLinkItem: {
        backgroundColor: '',
        linkItems: []
      },
      videos: [],
      bannerImage: {
        imagePC: {
          src: '',
          alt: '',
          title: ''
        },
        imageTablet: {
          src: '',
          alt: '',
          title: ''
        },
        imageMobile: {
          src: '',
          alt: '',
          title: ''
        }
      },
      bannerImages: [],
      eventLocations: [],
      rowColumn: 0,
      imageTexts: [],
      articleList: {
        categories: []
      },
      tabs: [],
      nestedSpecs: []
    };
    switch (this.templates[idx].type) {
      case 1:
        newTemplate.title = clone.title;
        newTemplate.content = clone.content;
        newTemplate.url = clone.url;
        newTemplate.urlEnabled = clone.urlEnabled;
        break;
      case 2:
        newTemplate.downloadList = clone.downloadList || [];
        break;
      case 3:
      case 24:
        newTemplate.cards = clone.cards || [];
        break;
      case 4:
      case 13:
      case 18:
        newTemplate.title = clone.title;
        newTemplate.content = clone.content;
        newTemplate.url = clone.url;
        newTemplate.urlEnabled = clone.urlEnabled;
        newTemplate.video = clone.video;
        break;
      case 6:
        newTemplate.title = clone.title;
        newTemplate.content = clone.content;
        newTemplate.url = clone.url;
        newTemplate.images = clone.images || [];
        break;
      case 5:
      case 7:
      case 8:
      case 19:
        newTemplate.title = clone.title;
        newTemplate.content = clone.content;
        newTemplate.url = clone.url;
        newTemplate.urlEnabled = clone.urlEnabled;
        newTemplate.image = clone.image;
        break;
      case 9:
      case 10:
        newTemplate.title = clone.title;
        newTemplate.subtitle = clone.subtitle;
        newTemplate.url = clone.url;
        newTemplate.urlEnabled = clone.urlEnabled;
        newTemplate.icons = clone.icons || [];
        break;
      case 11:
        newTemplate.title = clone.title;
        newTemplate.htmlContent = clone.htmlContent;
        newTemplate.url = clone.url;
        newTemplate.urlEnabled = clone.urlEnabled;
        break;
      case 12:
        newTemplate.title = clone.title;
        newTemplate.listItems = clone.listItems || [];
        break;
      case 14:
        newTemplate.images = clone.images || [];
        break;
      case 15:
        newTemplate.title = clone.title;
        newTemplate.videos = clone.videos || [];
        break;
      case 16:
        newTemplate.title = clone.title;
        newTemplate.rowColumn = clone.rowColumn;
        newTemplate.linkImages = clone.linkImages || [];
        break;
      case 20:
        newTemplate.listLinkItem = clone.listLinkItem;
        break;
      case 21:
        newTemplate.columns = clone.columns || [];
        break;
      case 22:
        newTemplate.panels = clone.panels || [];
        break;
      case 26:
        newTemplate.imageTexts = clone.imageTexts || [];
        break;
      case 27:
        newTemplate.articleList = clone.articleList;
        break;
      case 28:
        newTemplate.content = clone.content;
        newTemplate.imagePosition = clone.imagePosition;
        newTemplate.url = clone.url;
        newTemplate.urlEnabled = clone.urlEnabled;
        newTemplate.linkImages = clone.linkImages || [];
        break;
      case 29:
        newTemplate.tabs = clone.tabs || [];
        break;
      case 201:
        newTemplate.imageTexts = clone.imageTexts || [];
        break;
      case 202:
        newTemplate.title = clone.title;
        newTemplate.nestedSpecs = clone.nestedSpecs || [];
    }
    this.templates[idx] = newTemplate;
  }

  addTemplate(idx: number) {
    this.toolsService.lockScrollTop();

    const clone: Template[] = this.toolsService.copyObject(this.templates);
    clone.splice(idx, 0, {
      hideContent: false,
      showStyle: false,
      type: 0,
      title: '',
      subtitle: '',
      content: '',
      htmlContent: '',
      image: {
        src: '',
        alt: '',
        title: ''
      },
      images: [],
      linkImages: [],
      imagePosition: '',
      url: '',
      urlEnabled: true,
      cards: [],
      panels: [],
      columns: [],
      downloadList: [],
      icons: [],
      listItems: [],
      listLinkItem: {
        backgroundColor: '',
        linkItems: []
      },
      video: '',
      videos: [],
      bannerImage: {
        imagePC: {
          src: '',
          alt: '',
          title: ''
        },
        imageTablet: {
          src: '',
          alt: '',
          title: ''
        },
        imageMobile: {
          src: '',
          alt: '',
          title: ''
        }
      },
      bannerImages: [],
      eventLocations: [],
      rowColumn: 0,
      imageTexts: [],
      articleList: {
        categories: []
      },
      tabs: [],
      nestedSpecs: []
    });
    this.templates = clone;
  }

  deleteTemplate(i: number) {
    this.toolsService.lockScrollTop();
    this.templates.splice(i, 1);
    this.templates = this.toolsService.copyObject(this.templates);
  }

  setData(templates: Template[]) {
    this.templates = templates;
  }

  getData() {
    let newTemplates = this.templates.filter(template => {
      return template.type !== 0;
    });
    newTemplates = this.toolsService.copyObject(newTemplates);
    newTemplates.forEach(template => {
      template.hideContent = false;
      if (template.images) {
        template.images.forEach(image => {
          image.hideContent = false;
        });
      }
      if (template.downloadList) {
        template.downloadList.forEach(download => {
          download.hideContent = false;
        });
      }
      if (template.cards) {
        template.cards.forEach(card => {
          card.hideContent = false;
        });
      }
    });
    return newTemplates;
  }
}
