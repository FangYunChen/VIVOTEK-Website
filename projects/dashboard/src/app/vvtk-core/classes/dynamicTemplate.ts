import { TemplatePageOption } from './template';

export class DynamicTemplatePageOption extends TemplatePageOption {
  id: number;
  apis: {
    get: string;
    post: string;
    patch: string;
  };
}
