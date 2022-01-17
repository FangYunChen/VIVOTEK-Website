import { OssCategoryDeleteConfirmComponent } from './../oss-category-delete-confirm/oss-category-delete-confirm.component';
import { OnInit, OnDestroy, Component } from '@angular/core';
import { VvtkService } from '../../../../vvtk-core/services/vvtk.service';
import { SharedService } from '../../../../vvtk-core/services/shared.service';
import { MatDialog } from '@angular/material';
import { SortablejsOptions } from 'angular-sortablejs';
@Component({
  selector: 'vvtk-oss-category',
  templateUrl: './oss-category.component.html',
  styleUrls: ['./oss-category.component.scss']
})
export class OssCategoryComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;
  pageContentIsEditable: boolean;
  pageContentIsViewable: boolean;
  dataList: any[];
  isLoading = true;
  lockDelete = false;
  initialValueDict = {
    main: {},
    sub: {}
  };
  activeInputEle: HTMLInputElement;
  activeSubmitBtnEle: HTMLButtonElement;
  subCategoryOptions: SortablejsOptions = {
    handle: '.drag-handle',
    animation: 300,
    onUpdate: (event: any) => {
      this.patchSubCategorSequence(event);
    }
  };
  mainCategoryOptions: SortablejsOptions = {
    handle: '.drag-handle',
    animation: 300,
    onUpdate: (event: any) => {
      this.patchMainCategorySequence();
    }
  };

  constructor(
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.pageContentIsEditable = this.sharedService.checkIsEditableByUrl(
      '/landing-pages/oss/category/create'
    );
    this.getData();
  }

  getData() {
    this.isLoading = true;
    this.vvtkService.get(
      {
        path: `api/OSS/Categories`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json() || [];
          this.dataList = body || [];
          // Sort main category
          this.dataList.sort((curr, last) => (curr.order - last.order));
          // Sort subcategory
          this.dataList.forEach(data => {
            data['subCategories'].sort((curr, last) => (curr.order - last.order));
            this.initialValueDict['main'][data['id']] = data['categoryName'];
            data['subCategories'].forEach(sub => {
              this.initialValueDict['sub'][sub['id']] = sub['categoryName'];
            });
          });
        },
        finally: () => {
          this.isLoading = false;
        }
      }
    );
  }
  handleInputClick(e: Event) {
    const ele = <HTMLInputElement>e.target;
    if (!ele.hasAttribute('readonly')) {
      e.stopPropagation();
    }
  }
  handleSubmitBtnClick(e?) {
    e.stopPropagation();
  }
  handleCategoryEdit(event: Event, activeCategoryId: string, type: string) {
    // Remove the previous active element
    if (this.activeInputEle) {
      if (this.activeInputEle.hasAttribute('data-subcategory-id')) {
        const activeId = this.activeInputEle.getAttribute('data-subcategory-id');
        if (+activeId !== +activeCategoryId) {
          this.activeInputEle.value = this.initialValueDict['sub'][activeId];
        }
      } else {
        const activeId = this.activeInputEle.getAttribute('data-maincategory-id');
        if (+activeId !== +activeCategoryId) {
          this.activeInputEle.value = this.initialValueDict['main'][activeId];
        }
      }
      this.activeInputEle.classList.remove('category__input--active');
      this.activeInputEle.setAttribute('readonly', 'readonly');
      this.activeSubmitBtnEle.style.display = 'none';
    }
    // Get the current activated input
    const activeFrom: HTMLFormElement = type === 'main'
      ? document.forms[`maincategory-form-${activeCategoryId}`]
      : document.forms[`subcategory-form-${activeCategoryId}`];
    const activeInput = <HTMLInputElement>activeFrom.elements['categoryName'];
    const activeBtn = <HTMLButtonElement>activeFrom.elements['finishBtn'];

    // Force the input to be focused and styled
    activeBtn.style.display = 'inline-block';
    activeInput.removeAttribute('readonly');
    activeInput.classList.add('category__input--active');
    activeInput.focus();
    const that = this;
    // Add the event listener, handleDocClick, which will remove the styling when user click outside the area of activated input.
    document.addEventListener('click', function handleDocClick(e) {
      // Detect if the activeInput is part of the maincategory or subcategory.
      if (!activeInput.hasAttribute('readonly')) {
        if (activeInput.hasAttribute('data-subcategory-id')) {
          activeInput.value = that.initialValueDict['sub'][activeInput.getAttribute('data-subcategory-id')];
        } else {
          activeInput.value = that.initialValueDict['main'][activeInput.getAttribute('data-maincategory-id')];
        }
      }

      activeInput.classList.remove('category__input--active');
      activeInput.setAttribute('readonly', 'readonly');
      activeBtn.style.display = 'none';

      document.removeEventListener('click', handleDocClick);
    });
    // Store the current activated input
    this.activeInputEle = activeInput;
    this.activeSubmitBtnEle = activeBtn;
    // Stop event propagate to doocument
    event.stopPropagation();
  }
  delete(id: number, categoryName: string, mode: string) {
    this.lockDelete = true;

    let filteredMainCategory = JSON.parse(JSON.stringify(this.dataList));
    let isSub: boolean;
    if (mode === 'main') {
      filteredMainCategory = filteredMainCategory.filter(data => +data.id !== +id);
      isSub = false;
    } else {
      filteredMainCategory.map(data => {
        data.subCategories = data.subCategories.filter(sub => sub.id !== id);
      });
      isSub = true;
    }
    const dialogRef = this.dialog.open(OssCategoryDeleteConfirmComponent, {
      disableClose: false,
      data: {
        id: +id,
        title: categoryName,
        mainCateList: filteredMainCategory,
        isSub: isSub
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.state === 'true') {
        this.isLoading = true;
        const targetUrl = mode === 'main' ? `api/OSS/Category/${result.removedId}` : `api/OSS/SubCategory/${result.removedId}`;
        this.vvtkService.post(
          {
            path: targetUrl,
            disableLanguage: true
          },
          result.payload,
          {
            next: resp => {
              this.getData();
            },
            finally: () => {
              this.isLoading = false;
            }
          }
        );
      }
      this.lockDelete = false;
    });

  }
  handleCategorySubmit(e: Event, mode: string) {
    this.isLoading = true;
    e.preventDefault();
    const formsEle = <HTMLFormElement>e.target;
    let id: number;
    let targetUrl: string;
    if (mode === 'main') {
      id = +formsEle.getAttribute('data-maincategory-id');
      targetUrl = `api/OSS/Category/${id}`;
    } else {
      id = +formsEle.getAttribute('data-subcategory-id');
      targetUrl = `api/OSS/SubCategory/${id}`;
    }
    const payload = {
      categoryName: formsEle.elements['categoryName'].value
    };
    this.vvtkService.patch(
      {
        path: targetUrl,
        disableLanguage: true
      },
      payload,
      {
        next: () => {
          this.activeInputEle.classList.remove('category__input--active');
          this.activeInputEle.setAttribute('readonly', 'readonly');
          this.activeSubmitBtnEle.style.display = 'none';
          // Update init value of category name dict
          mode === 'main'
            ? this.initialValueDict['main'][id] = payload.categoryName
            : this.initialValueDict['sub'][id] = payload.categoryName;
        },
        finally: () => {
          this.isLoading = false;
        }
      }
    );
  }
  patchMainCategorySequence() {
    this.isLoading = true;
    // Generate sequencial Main Category which sent to backend later.
    const sequenciaMainCategroy = this.dataList.reduce((accu, curr, idx) => {
      curr['order'] = +idx + 1;
      return [...accu, { id: curr.id, order: idx + 1 }];
    }, []);
    this.vvtkService.post(
      {
        path: `api/OSS/Category/ChangeOrder`,
        disableLanguage: true
      },
      sequenciaMainCategroy,
      {
        finally: () => {
          this.isLoading = false;
        }
      }
    );
  }

  patchSubCategorSequence(event) {
    this.isLoading = true;
    const draggedMainCategoryId = +event.target.getAttribute('data-maincategory-id');
    const updatedMainCategroy = this.dataList.find(data => +data.id === +draggedMainCategoryId);
    // Generate sequencial sub Category which sent to backend later.
    const sequencialSubCategory = updatedMainCategroy['subCategories'].reduce((accu, curr, idx) => {
      curr['order'] = idx + 1;
      return [...accu, { id: curr.id, order: idx + 1 }];
    }, []);

    this.vvtkService.post(
      {
        path: `api/OSS/SubCategory/ChangeOrder`,
        disableLanguage: true
      },
      sequencialSubCategory,
      {
        finally: () => {
          this.isLoading = false;
        }
      }
    );

  }

  ngOnDestroy() {
  }
}
