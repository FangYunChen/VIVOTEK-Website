export interface PasswordForm {
  /**
   * 舊密碼
   */
  oldPassword: string;

  /**
   * 新密碼
   */
  password: string;

  /**
   * 是否沒有密碼
   */
  hasNoPassword: boolean;
}
