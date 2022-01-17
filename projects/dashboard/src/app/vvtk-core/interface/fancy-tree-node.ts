/** Find property for fancy tree : https://github.com/mar10/fancytree/wiki/TutorialLoadData
 *
 *  The following attributes are available as 'node.PROPERTY':
 *
 *  checkbox, expanded, extraClasses, folder, icon, key, lazy, partsel, refKey,
 *  selected, statusNodeType, title, tooltip, unselectable, unselectableIgnore, unselectableStatus.
 *
 *  All other fields are considered custom and will be added to the nodes data object as 'node.data.PROPERTY' (e.g. 'node.data.myOwnAttr').
*/
export interface FancyTreeNode<T> {
  title: string;
  expanded?: boolean;
  folder?: boolean;
  /** Custom field */
  type: string;
  lazy?: boolean;
  /** Custom field */
  dbData?: T;
  children?: FancyTreeNode<T>[];
  /** All other fields are considered custom and will be added to the nodes data object as 'node.data.PROPERTY' (e.g. 'node.data.dbData').*/
  data?: any;
  checkbox?: any;
  extraClasses?: any;
  icon?: any;
  key?: any;
  partsel?: any;
  refKey?: any;
  selected?: any;
  statusNodeType?: any;
  tooltip?: any;
  unselectable?: any;
  unselectableIgnore?: any;
  unselectableStatus?: any;
}
