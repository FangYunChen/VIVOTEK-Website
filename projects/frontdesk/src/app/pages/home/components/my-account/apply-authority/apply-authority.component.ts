import { Component, OnInit } from '@angular/core';
import { CommonCheckSelectOption } from '@frontdesk/core/interfaces/common-model';
import { DownloadCenterApplication, DownloadDocumentType } from '@frontdesk/core/interfaces/download-center';
import { VvtkApiService, AccountService, VvtkService, I18nService } from '@frontdesk/core/services';
import { ToolsService } from '@frontdesk/core/services/tools.service';
import { forkJoin } from 'rxjs';
import { concatMap, finalize, map } from 'rxjs/operators';
import { RegisterApplyForm } from '@frontdesk/core/interfaces/register-form';
import { I18nPipe } from '@frontdesk/shared/pipes/i18n.pipe';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'vvtk-apply-authority',
  templateUrl: './apply-authority.component.html',
  styleUrls: ['./apply-authority.component.scss']
})
export class ApplyAuthorityComponent implements OnInit {

  downloadCenterAuth: CommonCheckSelectOption[] = [
    {checked : false, disabled : false, optionText : '', value : 0},
    {checked : false, disabled : false, optionText : '', value : 0},
    {checked : false, disabled : false, optionText : '', value : 0}
  ];
  accountdata: RegisterApplyForm = { countryId: '', applications: '', devices : ''
  , cameraModel : '', distributorChannel : '', cameraMAC : '', useCases : '' , purchase : '', macAddress : '', countingUseCase : ''};
  countries = [];

  displayedColumns = [
    'checked',
    'statusText',
    'documentTypeName',
  ];
  isLoading = false;
  i18n = new I18nPipe(this.i18nService);

  private get permissionDocumentType$() {
    return this.vvtkApiService.get<DownloadDocumentType[]>({
      path: `api/DownloadCenter/DocumentTypes`,
      disableLanguage: true
    }).pipe(
      map(types =>
        this.toolsService.mapTreeToArray(types)
          .filter(type => type.isPermissionRequired)
      )
    );
  }

  private get applicationPermissions$() {
    return this.vvtkApiService.get<DownloadCenterApplication[]>({
      path: 'api/DownloadCenter/Applications',
      disableLanguage: true,
      needAuth: true
    });
  }

  private get userAccountData$() {
    return this.accountService
    .getMyAccountData();
  }

  applyStatusMap = new Map<any, string>([
    [undefined, this.i18n.transform('Not apply yet')],
    [null, this.i18n.transform('Pending')],
    [true, this.i18n.transform('Passed')],
    [false, this.i18n.transform('Rejected')],
  ]);

  constructor(
    private vvtkApiService: VvtkApiService,
    private toolsService: ToolsService,
    private vvtkService: VvtkService,
    private accountService: AccountService,
    private i18nService: I18nService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getData()
      .subscribe(([documentTypes, permissions, resp]) => {
        this.setDownloadCenterAuth(documentTypes, permissions);
        if (resp.ok) {
          const data = resp.json();
            this.accountdata.countryId = data.countryId;
            this.accountdata.applications = data.applications;
            this.accountdata.devices = data.devices;
            this.accountdata.cameraModel = data.cameraModel;
            this.accountdata.distributorChannel = data.distributorChannel;
            this.accountdata.cameraMAC = data.cameraMAC;
            this.accountdata.useCases = data.useCases;
            this.accountdata.purchase = data.purchase;
            this.accountdata.macAddress = data.macAddress;
            this.accountdata.countingUseCase = data.countingUseCase;
            this.initCountries();
            this.route.queryParams.subscribe((value) => {
              if (value['Auth'] === 'Anpr') {
                if (this.downloadCenterAuth[1].disabled === false) {
                  this.downloadCenterAuth[1].checked = true;
                }
              } else if ( value['Auth'] === 'SDK') {
                if (this.downloadCenterAuth[0].disabled === false) {
                  this.downloadCenterAuth[0].checked = true;
                }
              } else if ( value['Auth'] === 'Counting') {
                if (this.downloadCenterAuth[2].disabled === false) {
                  this.downloadCenterAuth[2].checked = true;
                }
              }
            });
          }
        }
      );
  }

  getData() {
    return forkJoin(
      this.permissionDocumentType$,
      this.applicationPermissions$,
      this.userAccountData$
    );
  }

  setDownloadCenterAuth(documentTypes: DownloadDocumentType[], permissions: DownloadCenterApplication[]) {
    const userPermissionMap = new Map<number, boolean>(
      permissions.map(x => [x.documentTypeId, x.isPermitted] as [number, boolean])
    );

    this.downloadCenterAuth = documentTypes.map(documentType => {
      const isPermitted = userPermissionMap.get(documentType.id);
      return {
        optionText: documentType.name,
        value: documentType.id,
        checked: false,
        // 已經通過或是申請中 => disabled設為true
        disabled: (isPermitted === true || isPermitted === null),
        statusText: this.applyStatusMap.get(isPermitted)
      };
    });
  }

  applyAuthority() {
    this.isLoading = true;
    this.postApplyData().subscribe(
      ([[documentTypes, permissions, resp], ttt]) => this.setDownloadCenterAuth(documentTypes, permissions)
    );
  }

  private get postData() {
    return this.downloadCenterAuth
      .filter(x => x.checked)
      .map(x => x.value);
  }

  postApplyData() {
    return forkJoin(
      this.downloadCenterApply$,
      this.downloadCenterApplyData$
    );
  }

  private get downloadCenterApply$() {
    return this.vvtkApiService.post({
      path: `api/DownloadCenter/Apply`,
      disableLanguage: true,
      needAuth: true
    }, this.postData)
      .pipe(
        concatMap(_ => this.getData()),
        finalize(() => this.isLoading = false)
      );
  }

  private get downloadCenterApplyData$() {
    return this.vvtkApiService.post({
      path: `api/DownloadCenter/Apply/Data`,
      disableLanguage: true,
      needAuth: true
    }, this.accountdata);
  }

  initCountries() {
    this.vvtkService.get(
      {
        path: 'api/Countries/Real',
        disableLanguage: true
      },
      {
        next: resp => {
          if (resp.ok) {
            this.countries = resp.json();
          }
        }
      }
    );
  }

  countriesChanged($event) {
    const countryId = typeof $event === 'object' ? $event.target.value : $event;
    this.accountdata.countryId = countryId;
  }


  ApplyDisable() {
    // var b = !(this.downloadCenterAuth[1].checked && (this.accountdata.cameraModel.trim()
    //   && this.accountdata.distributorChannel.trim() && this.accountdata.cameraMAC.trim() && this.accountdata.useCases.trim()))
    //   && !(this.downloadCenterAuth[0].checked && (this.accountdata.countryId && this.accountdata.applications.trim()
    //   && this.accountdata.devices.trim()))
    //   && !(this.downloadCenterAuth[2].checked && (this.accountdata.purchase && this.accountdata.macAddress.trim()
    //   && this.accountdata.countingUseCase.trim()));
    // if (this.downloadCenterAuth[1].checked && this.downloadCenterAuth[0].checked && this.downloadCenterAuth[2].checked) {
    // b = !(this.downloadCenterAuth[1].checked && this.accountdata.cameraModel.trim()
    //     && this.accountdata.distributorChannel.trim() && this.accountdata.cameraMAC.trim() && this.accountdata.useCases.trim()
    //     && this.downloadCenterAuth[0].checked &&  this.accountdata.countryId && this.accountdata.applications.trim()
    //     && this.accountdata.devices.trim() && this.accountdata.purchase && this.accountdata.macAddress.trim()
    //     && this.accountdata.countingUseCase.trim());
    // }
    var b = false;
    if(!this.downloadCenterAuth[1].checked && !this.downloadCenterAuth[0].checked && !this.downloadCenterAuth[2].checked){
      b = true;
    }
    if(this.downloadCenterAuth[0].checked){
      b = b || (!(this.accountdata.countryId && this.accountdata.applications.trim()
         && this.accountdata.devices.trim()));
    }
    if(this.downloadCenterAuth[1].checked){
      b = b || (!(this.accountdata.cameraModel.trim()
         && this.accountdata.distributorChannel && this.accountdata.cameraMAC.trim() && this.accountdata.useCases.trim()))
    }
    if(this.downloadCenterAuth[2].checked){
      b = b || (!(this.accountdata.purchase.trim() && this.accountdata.macAddress.trim()
         && this.accountdata.countingUseCase.trim()));
    }
    return b;
  }
}
