import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '../../../vvtk-core/classes/account';
import { Permission } from '../../../vvtk-core/classes/permission';
import { Role } from '../../../vvtk-core/classes/role';
import { SharedService } from '../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../vvtk-core/services/vvtk.service';

@Component({
  selector: 'vvtk-account-content',
  templateUrl: './account-content.component.html',
  styleUrls: ['./account-content.component.scss']
})
export class AccountContentComponent implements OnInit {
  pageIsEditable: boolean;

  id: string;
  roles: Role[];
  data: Account;

  lockPermissionsTimer: NodeJS.Timer;

  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit() {
    const routeParams$ = this.route.params.subscribe(params => {
      this.pageIsEditable = this.sharedService.pageIsEditable;

      this.id = params['id'];
      this.getRoles();
      this.getData();
      setTimeout(() => {
        routeParams$.unsubscribe();
      }, 1);
    });
  }

  getRoles() {
    this.vvtkService.get(
      {
        path: `api/Roles`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();
          this.roles = body;
        }
      }
    );
  }

  getData() {
    this.vvtkService.get(
      {
        path: `api/Accounts/${this.id}`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();
          this.setPermissionsLevel(body.permissions);
          this.data = body;
          this.lockPermissions();
          const roles: string[] = [];
          this.data.roles.forEach(role => {
            roles.push(role.id);
          });
          this.data.roles = roles;
        }
      }
    );
  }

  setPermissionsLevel(
    permissions: Permission[],
    parentId: number = null,
    level: number = 0
  ) {
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
    this.vvtkService.patch(
      {
        path: `api/Accounts/${this.id}`,
        disableLanguage: true
      },
      this.data,
      {
        next: resp => {
          this.router.navigate(['/accounts/list']);
        },
        finally: () => {
          this.isLoading = false;
        }
      }
    );
  }

  selectedRolesChecked(id: string) {
    return this.data.roles.indexOf(id) >= 0;
  }

  selectedRolesChange(id: string, input: HTMLInputElement) {
    if (input.checked && this.data.roles.indexOf(id) === -1) {
      this.data.roles.push(id);
    } else {
      const index: number = this.data.roles.indexOf(id);
      if (index >= 0) {
        this.data.roles.splice(index, 1);
      }
    }
  }
}
