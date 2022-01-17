import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Permission } from '../../../vvtk-core/classes/permission';
import { Role } from '../../../vvtk-core/classes/role';
import { SharedService } from '../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../vvtk-core/services/vvtk.service';

@Component({
  selector: 'vvtk-role-content',
  templateUrl: './role-content.component.html',
  styleUrls: ['./role-content.component.scss']
})
export class RoleContentComponent implements OnInit {
  pageIsEditable: boolean;

  id = 'new';
  data: Role;

  lockPermissionsTimer: NodeJS.Timer;

  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;

    const routeParams$ = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getData();
      setTimeout(() => {
        routeParams$.unsubscribe();
      }, 1);
    });
  }

  getData() {
    this.vvtkService.get(
      {
        path: `api/Roles/${this.id}`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body: Role = resp.json();
          this.setPermissionsLevel(body.permissions);
          this.data = body;
          this.lockPermissions();
        }
      }
    );
  }

  setPermissionsLevel(permissions: Permission[], parentId: number = null, level: number = 0) {
    const filter = permissions.filter(permission => {
      return permission.parentId === parentId;
    });
    filter.forEach(permission => {
      permission.level = level;
      this.setPermissionsLevel(permissions, permission.id, level + 1);
    });
  }

  changeIsViewable(checked: boolean, idx: number) {
    this.data.permissions[idx].isViewable = checked;
    if (!checked) {
      this.data.permissions[idx].isEditable = checked;
    }
    this.data.permissions.forEach((permission, _idx) => {
      if (permission.parentId === this.data.permissions[idx].id) {
        this.changeIsViewable(checked, _idx);
      }
    });
    this.lockPermissions();
  }

  changeIsEditable(checked: boolean, idx: number) {
    checked = checked && this.data.permissions[idx].isViewable;
    this.data.permissions[idx].isEditable = checked;
    this.data.permissions.forEach((permission, _idx) => {
      if (permission.parentId === this.data.permissions[idx].id) {
        this.changeIsEditable(checked, _idx);
      }
    });
    this.lockPermissions();
  }

  lockPermissions() {
    if (this.lockPermissionsTimer) {
      clearTimeout(this.lockPermissionsTimer);
    }
    this.lockPermissionsTimer = setTimeout(() => {
      this.data.permissions.forEach(permission => {
        permission.lockIsEditable = !permission.isViewable;
        if (permission.parentId) {
          const parent = this.data.permissions.find(p => {
            return permission.parentId === p.id;
          });
          if (parent) {
            if (!parent.isViewable) {
              permission.lockIsViewable = true;
            } else {
              permission.lockIsViewable = false;
            }
            if (!parent.isEditable) {
              permission.lockIsEditable = true;
            } else {
              permission.lockIsEditable = !permission.isViewable;
            }
          }
        }
      });
    }, 10);
  }

  save() {
    this.isLoading = true;

    if (this.id === 'new') {
      this.vvtkService.post(
        {
          path: `api/Roles`,
          disableLanguage: true
        },
        this.data,
        {
          next: resp => {
            this.router.navigate(['/roles/list']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    } else {
      this.vvtkService.put(
        {
          path: `api/Roles/${this.id}`,
          disableLanguage: true
        },
        this.data,
        {
          next: resp => {
            this.router.navigate(['/roles/list']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    }
  }
}
