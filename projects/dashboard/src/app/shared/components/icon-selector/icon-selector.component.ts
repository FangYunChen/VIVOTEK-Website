import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Icon, IconType } from '../../../vvtk-core/interface/icon';
import { VvtkService } from '../../../vvtk-core/services/vvtk.service';

@Component({
  selector: 'vvtk-icon-selector',
  templateUrl: './icon-selector.component.html',
  styleUrls: ['./icon-selector.component.scss']
})
export class IconSelectorComponent implements OnInit {

  @Input() pageIsEditable = false;
  @Input() iconTypes: IconType[] = [];
  @Input() selectedIcons: Icon[] = [];
  @Input() selectIconText = 'Choose Icon';
  @Input() multiple = true;

  @Output() selectedIconsChange: EventEmitter<Icon[]> = new EventEmitter<Icon[]>();
  @Output() addSelect: EventEmitter<Icon> = new EventEmitter<Icon>();

  selectedIconType: number;
  icons: Icon[] = [];
  canSelectIcons: Icon[] = [];

  constructor(private vvtkService: VvtkService) { }

  ngOnInit() {
  }

  iconTypeChange(iconTypeId) {
    if (iconTypeId) {
      this.vvtkService.get(
        {
          path: `api/Icons`,
          query: {
            typeId: iconTypeId,
            pageIndex: 0,
            pageSize: 10000
          }
        },
        {
          next: resp => {
            const body = resp.json().list;
            this.icons = body;
            this.filterAvailableIcons();
          }
        }
      );
    }
  }

  filterAvailableIcons() {
    this.canSelectIcons = this.icons.filter(icon =>
      this.selectedIcons.filter(selectedIcon => icon.id === selectedIcon.id).length === 0);
  }

  addIcon(icon: Icon) {
    if (!this.multiple) {
      this.selectedIcons.splice(0, this.selectedIcons.length);
    }
    this.selectedIcons.push(icon);
    this.filterAvailableIcons();
  }

  removeIcon(icon: Icon) {
    this.selectedIcons = this.selectedIcons.filter(x => x.id !== icon.id);
    this.selectedIconsChange.emit(this.selectedIcons);
    this.filterAvailableIcons();
  }

}
