import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../../../vvtk-core/services/vvtk.service';
import { IconType } from '../../../../../vvtk-core/interface/icon';

@Component({
  selector: 'vvtk-icon-type-content',
  templateUrl: './icon-type-content.component.html'
})
export class IconTypeContentComponent implements OnInit {
  pageIsEditable: boolean;

  id: number;
  iconType: IconType;

  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.iconType = {
      id: 0,
      name: ''
    };
  }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    const routeParams$ = this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id > 0) {
        this.getIconType();
      }
      setTimeout(() => {
        routeParams$.unsubscribe();
      }, 1);
    });
  }

  getIconType() {
    this.vvtkService.get(
      {
        path: `api/Icons/IconTypes/${this.id}`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();
          this.iconType = body;
        }
      }
    );
  }

  save() {
    this.isLoading = true;
    if (this.id === 0) {
      this.vvtkService.post(
        {
          path: `api/Icons/IconTypes`,
          disableLanguage: true
        },
        this.iconType,
        {
          next: resp => {
            this.router.navigate(['/public/icons/type']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    } else {
      this.vvtkService.put(
        {
          path: `api/Icons/IconTypes/${this.id}`,
          disableLanguage: true
        },
        this.iconType,
        {
          next: resp => {
            this.router.navigate(['/public/icons/type']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    }
  }

}
