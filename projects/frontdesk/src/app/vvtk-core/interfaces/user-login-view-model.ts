import { SysModuleViewModel } from './sys-module-view-model';

export interface UserLoginViewModel {
  /**
   * 使用者 ID
   */
  id: string;

  /**
   * 使用者顯示名稱
   */
  displayName: string;

  /**
   * 使用者 Email
   */
  email: string;

  /**
   * 使用者 Email 是否通過驗證
   */
  emailConfirmed: string;

  /**
   * 使用者註冊語系
   */
  lang: string;

  /**
   * 已授權系統模組內容
   */
  modules: SysModuleViewModel[];
}
