export interface RegisterForm {
  // 帳號
  email: string;
  // 產業類別
  industryType?: string;
  // 國家
  countryId: string;
  // 語系
  lang: string;
  // 身分別(Role)
  identityRole: string;
  // 姓
  lastName: string;
  // 名
  firstName: string;
  // 密碼
  password: string;
  // 電話
  phone?: string;
  // 手機
  mobile?: string;
  // 傳真
  fax?: string;
  // 網站
  website?: string;
  // 來源
  source?: string;
  // 公司
  company?: string;
  // 部門
  department?: string;
  // 頭銜
  title?: string;
  // 州/省
  stateId?: string;
  // 城市
  city?: string;
  // 地址
  address?: string;
  // 驗證頁面網址
  confirmUrl: string;
  // 外部登入存取權杖
  externalAccessToken: string;
  // 外部登入提供者
  provider: string;
  // 外部登入 User ID
  providerKey: string;
  // 訂閱電子報
  eNewsSubscription: boolean;
  // Target applications to be working with VIVOTEK products
  applications: string;
  // Any projects ongoing / anticipated volume using VIVOTEK devices
  devices: string;
}

export interface RegisterApplyForm {
    // 國家2
    countryId: string;
    // Target applications to be working with VIVOTEK products
    applications: string;
    // Any projects ongoing / anticipated volume using VIVOTEK devices
    devices: string;

    cameraModel: string;

    distributorChannel: string;

    cameraMAC: string;

    useCases: string;

    purchase: string;

    macAddress: string;

    countingUseCase: string;
}

export interface ProjectRegistrationForm {
   // 日期
   date?: string;
   //
   quotationNumber: string;
   //
   discount: string;
   //
   approvedBy: string;
   //
   youName: string;
   //
   youLocation: string;
   //
   youContactName: string;
   //
   youContactPhone: string;
   //
   youContactEmail: string;
   //
   name1: string;
   //
   location1: string;
   //
   typeofBusiness1: string;
   //
   name2: string;
   //
   location2: string;
   //
   typeofBusiness2: string;
   //
   projectForecast: string;
   //
   projectOpportunity: string;
   //
   softwarePartners: string;
   //
   probability: string;
   //
   productDelivery: string;
   //
   markupMargin: string;
   //
   quotations: string;
}
