import { Template } from './template';

export class Review {
  updatedUser?: ReviewUser;
  reviewer?: any;
  reviewNote?: string;
  confirmUrl?: string;
}

export class ReviewData extends Review {
  templates?: Template[];
  content?: string;
  sheet?: string;
  file?: {
    name: string;
    url: string;
  };
}

export class ReviewStatus {
  draft?: ReviewStatusInfo;
  review?: ReviewStatusInfo;
  publish?: ReviewStatusInfo;
}

export class ReviewStatusInfo {
  status?: number;
  updatedAt?: string;
  updatedUser?: ReviewUser;
  submitedAt?: string;
  submitedUser?: ReviewUser;
  reviewAt?: string;
  reviewer?: ReviewUser;
  rejectedAt?: string;
  rejectedUser?: ReviewUser;
  deletedAt?: string;
  deletedUser?: ReviewUser;
  publishedAt?: string;
  publishedUser?: ReviewUser;
}

export class ReviewUser {
  id?: string;
  name: string;
  email: string;
}

export class ReviewPageOpts {
  title: string;
  routerPath: string;
  apis: {
    get: string;
  };
}

export class ReviewPageContentOpts {
  title: string;
  hasContent?: boolean;
  hasTemplate?: boolean;
  hasSheet?: boolean;
  hasFile?: boolean;
  dirPath: string; // 編輯器及樣板上傳檔案的路徑
  routerPath: string; // 檢查權限用
  parentPath: string; // 回狀態頁
  parentQuery?: { [k: string]: any }; // 狀態頁Query
  apis: {
    getReviewers: string;
    getStatus: string;
    publish: string;
    draft: string;
    review: string;
  };
  templateTypes?: number[];
}
