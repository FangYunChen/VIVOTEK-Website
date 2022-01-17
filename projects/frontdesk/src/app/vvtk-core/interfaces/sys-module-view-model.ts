export interface SysModuleViewModel {
  /**
   * 模組編號
   */
  id: number;

  /**
   * 模組類型(BackendModule: 後台模組; FrontendModule: 前台模組)
   */
  type: string;

  /**
   * 模組名稱
   */
  name: string;

  /**
   * 選單圖示
   */
  icon: string;

  /**
   * 路由路徑
   */
  route: string;

  /**
   * 上層模組編號
   */
  parentId: number;

  /**
   * 位置
   */
  position: number;

  /**
   * 選單提示泡泡文字
   */
  badge: string;

  /**
   * 選單提示泡泡顏色
   */
  badgeColor: string;

  /**
   * 自訂CSS類別
   */
  customClass: string;

  /**
   * 是否為可見選單
   */
  isVisible: boolean;

  /**
   * 具有可讀權限
   */
  isViewable: boolean;

  /**
   * 具可寫權限
   */
  isEditable: boolean;

  /**
   * 子選單
   */
  childModules: SysModuleViewModel[];
}
