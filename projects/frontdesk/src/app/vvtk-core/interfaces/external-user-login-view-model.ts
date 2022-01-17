/**
 * 外部登入結果
 */
export interface ExternalUserLoginViewModel {
  /**
   * 外部 OAuth 供應商
   */
  provider: string;

  /**
   * 外部 OAuth ID
   */
  providerKey: string;

  /**
   * 外部 OAuth 存取 token
   */
  externalAccessToken: string;

  /**
   * 姓
   */
  firstName: string;

  /**
   * 名
   */
  lastName: string;

  /**
   * Email
   */
  email: string;
}
