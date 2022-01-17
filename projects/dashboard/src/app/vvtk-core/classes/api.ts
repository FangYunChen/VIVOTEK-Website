import { Response } from '@angular/http';
export class ApiPath {
  /** 在language前面 */
  path: string;
  /** 在language後面 */
  action?: string;
  /** GET的參數 */
  query?: Object;
  /** null表示系統目前語系 */
  language?: string;
  /** true 表示不需要語系 */
  disableLanguage?: boolean;
}

export class ApiEvent {
  next?: (value: Response) => void;
  error?: (error: any) => void;
  complete?: () => void;
  finally?: () => void;
}
