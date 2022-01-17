export class SidenavItem {
    id: number;
    name: string;
    icon: string;
    route: any;
    parent: SidenavItem;
    subItems: SidenavItem[];
    subHideItems: SidenavItem[];
    position: number;
    badge: string;
    badgeColor: string;
    customClass: string;

    constructor(model: any = null) {
        if (model) {
            this.id = model.id;
            this.name = model.name;
            this.icon = model.icon;
            this.route = model.route;
            this.parent = model.parent;
            this.subItems = this.mapSubItems(model.subItems);
            this.subHideItems = this.mapSubItems(model.subHideItems);
            this.position = model.position;
            this.badge = model.badge;
            this.badgeColor = model.badgeColor;
            this.customClass = model.customClass;
        }
    }

    hasSubItems() {
        if (this.subItems) {
            return this.subItems.length > 0;
        }
        return false;
    }

    hasSubHideItems() {
        if (this.subItems) {
            return this.subHideItems.length > 0;
        }
        return false;
    }

    hasParent() {
        return !!this.parent;
    }

    mapSubItems(list: SidenavItem[]) {
        if (list) {
            list.forEach((item, index) => {
                list[index] = new SidenavItem(item);
            });

            return list;
        }
    }

    isRouteString() {
        return this.route instanceof String || typeof this.route === 'string';
    }
}
