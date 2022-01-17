import {
  Inject,
  Injectable,
  RendererFactory2,
  ViewEncapsulation
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { CustomRoute } from '../interfaces/custom-route';
import { LayoutMenuNode } from '../interfaces/layout-menu-node';
import { MetaTag } from '../interfaces/meta-tag';
import { I18nService } from './i18n.service';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PageMetaService {

  url: string;
  customRoute: CustomRoute;
  path: string;

  private headerStyle = new BehaviorSubject<string[]>([
    'styleW',
    'styleTableW',
    'styleAppW'
  ]);
  headerStyle$ = this.headerStyle.asObservable();

  private banner = new BehaviorSubject<CustomRoute>(null);
  banner$ = this.banner.asObservable();

  private headerLayoutMenuNode = new BehaviorSubject<LayoutMenuNode[]>([]);
  headerMenuNode$ = this.headerLayoutMenuNode.asObservable();

  private footerLayoutMenuNode = new BehaviorSubject<LayoutMenuNode[]>([]);
  footerMenuNode$ = this.footerLayoutMenuNode.asObservable();

  private breadcrumbs = new BehaviorSubject<LayoutMenuNode[]>([]);
  breadcrumbs$ = this.breadcrumbs.asObservable();

  constructor(
    private rendererFactory: RendererFactory2,
    private titleService: Title,
    private i18nService: I18nService,
    @Inject(DOCUMENT) private document: HTMLDocument,
  ) { }

  // 設定title、banner、SEO
  setPageSettingByUrl(url: string) {
    this.url = decodeURIComponent(url);

    this.customRoute = null;
  }

  setHeaderStyle(customRoute: CustomRoute) {
    // 沒有設定
    if (!customRoute) {
      if (
        this.url.replace(this.i18nService.getSelectedLanguageForLink(), '') === '/index'
        || this.url.replace(this.i18nService.getSelectedLanguageForLink(), '') === ''
      ) {
        // 首頁強制白header
        this.headerStyle.next(['styleW', 'styleTableW', 'styleAppW']);
        return;
      }
      // 沒有設定也不是首頁，用黑header
      this.headerStyle.next(['styleBk', 'styleTableBk', 'styleAppBk']);
      return;
    }
    // 首頁強制白header
    if (
      customRoute.path.replace(':lang/', '') === '/index' ||
      customRoute.path.replace(':lang/', '') === ''
    ) {
      this.headerStyle.next(['styleW', 'styleTableW', 'styleAppW']);
      return;
    } else {
      const headerStyle: string[] = [];
      headerStyle.push(customRoute.imgPcSrc ? 'styleW' : 'styleBk');
      headerStyle.push(
        customRoute.imgTabletSrc ? 'styleTableW' : 'styleTableBk'
      );
      headerStyle.push(customRoute.imgMobileSrc ? 'styleAppW' : 'styleAppBk');

      this.headerStyle.next(headerStyle);
    }
  }

  setBanner(customRoute: CustomRoute) {
    this.banner.next(customRoute);
  }

  setTitle(customRoute: CustomRoute | string) {
    let title = '';

    if (typeof customRoute === 'string') {
      title = customRoute;
    }
    if (customRoute && (customRoute as CustomRoute).title) {
      title = (customRoute as CustomRoute).title;
    }
    this.titleService.setTitle(`${title} :: VIVOTEK ::`);
  }

  removeMeta(tagNodes: HTMLElement[]) {
    tagNodes.forEach(tag => {
      tag.remove();
    });
  }

  setMeta(metaTags: MetaTag[]) {
    const nodes = [];
    const renderer = this.rendererFactory.createRenderer(this.document, {
      id: '-1',
      encapsulation: ViewEncapsulation.None,
      styles: [],
      data: {}
    });

    const head = this.document.head;
    metaTags.forEach(metaItem => {
      const meta = renderer.createElement(metaItem.tagName);
      metaItem.attr.forEach(attr => {
        renderer.setAttribute(meta, attr.name, attr.value);
      });
      renderer.appendChild(head, meta);
      nodes.push(meta);
    });

    return nodes;
  }

  removeJsonld(jsonldNode: HTMLElement) {
    if (!!jsonldNode) {
      jsonldNode.remove();
    }
  }

  setJsonld(jsonld: string) {
    const renderer = this.rendererFactory.createRenderer(this.document, {
      id: '-2',
      encapsulation: ViewEncapsulation.None,
      styles: [],
      data: {}
    });
    const head = this.document.head;
    const script = renderer.createElement('script');
    renderer.setAttribute(script, 'type', 'application/ld+json');
    const jsonldText = renderer.createText(jsonld);
    renderer.appendChild(script, jsonldText);
    renderer.appendChild(head, script);
    return script;
  }

  getCustomPath(referPath: string) {
    if (referPath) {
      referPath = referPath.toString();
      if (referPath.indexOf('http') < 0) {
        referPath = `${this.i18nService.getSelectedLanguageForLink()}${referPath}`;
      }
    }
    return referPath;
  }

  setHeaderMenuNode(val: LayoutMenuNode[]) {
    this.headerLayoutMenuNode.next(val);
    this.getBreads();      
  }

  setFooterMenuNode(val: LayoutMenuNode[]) {
    this.footerLayoutMenuNode.next(val);
    this.getBreads();
  }

  getBreads(path: string = this.path) {
    if (!path) {
      this.breadcrumbs.next([]);
    }
    
    if(path.indexOf(this.i18nService.getSelectedLanguage()) > 0){
      this.path = path.replace(this.i18nService.getSelectedLanguage() +'/','');
    }
    else {
      this.path = path;
    }

    let nodeList: LayoutMenuNode[] = [];
    nodeList = this.getBreadsFromMenuNode(
      path,
      this.footerLayoutMenuNode.value
    );

    if (nodeList.length === 0) {
      nodeList = this.getBreadsFromMenuNode(
        path,
        this.headerLayoutMenuNode.value
      );
    }

    this.breadcrumbs.next(nodeList);
  }

  getBreadsFromMenuNode(
    path: string,
    menuNodeList: LayoutMenuNode[]
  ): LayoutMenuNode[] {
    let nodeList: LayoutMenuNode[] = [];
    for (const node of menuNodeList) {
      if (node.url) {
        if (node.url === path) {
          nodeList = [node];
          break;
        }
      }
      if (node.subMenu) {
        const findNode = this.getBreadsFromMenuNode(path, node.subMenu);
        if (findNode.length > 0) {
          nodeList = [node].concat(findNode);
          break;
        }
      }
    }
    return nodeList;
  }
}
