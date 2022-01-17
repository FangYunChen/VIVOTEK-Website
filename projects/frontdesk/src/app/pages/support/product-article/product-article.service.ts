import { Injectable } from '@angular/core';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { SupportAricleContent, SupportProduct } from '@frontdesk/core/interfaces/support-article';
import { SupportArticleType } from '@frontdesk/core/constants/support-article-constant';

export interface Tag {
  id: number;
  name: string;
}

@Injectable()
export class ProductArticleService {

  selectedCategoryId$: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  articles$: Observable<SupportAricleContent[]>;
  product$: Observable<SupportProduct>;

  get selectedCategoryId(): number {
    return this.selectedCategoryId$.value;
  }

  constructor(private vvtkApiService: VvtkApiService) { }

  getArticlesByProduct(productRoute: string, articleType: SupportArticleType = SupportArticleType.Article) {
    const query = { productTypeSubRoute: productRoute, type: articleType };
    this.articles$ = this.vvtkApiService.post<SupportAricleContent[]>({
      path: 'api/Support/Articles'
    }, query);
  }

  getProductByRoute(productRoute: string) {
    this.product$ = this.vvtkApiService.post<SupportProduct>({
      path: 'api/Support/ProductTypes/BySubRoute'
    }, { subRoute: productRoute });
  }

  selectItem(id: number) {
    this.selectedCategoryId$.next(id);
  }

}
