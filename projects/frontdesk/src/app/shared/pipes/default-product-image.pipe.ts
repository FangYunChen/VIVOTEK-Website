import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultProductImage'
})
export class DefaultProductImagePipe implements PipeTransform {

  /**Set product image path to default image path if product image path is falsy*/
  transform(imagePath: any, args?: any): any {
    return imagePath ? imagePath : '/assets/img/default/default-product.png';
  }

}
