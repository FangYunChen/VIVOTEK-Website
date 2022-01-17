import { Response } from '@angular/http';
export interface ApiEvent {
  next?: (value: Response) => void;
  error?: (error: any) => void;
  complete?: () => void;
  finally?: () => void;
}
