export interface ApiPath {
  /** 在language前面 */
  path: string;
  /** 在language後面 */
  action?: string;
  /** GET的參數 */
  query?: string;
  /** null表示系統目前語系 */
  language?: string;
  /** true 表示不需要語系 */
  disableLanguage?: boolean;
  /** true 表示打API時要帶使用者資訊 */
  needAuth?: boolean;
}
