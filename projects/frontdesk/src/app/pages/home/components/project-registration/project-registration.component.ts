import {Component, OnInit} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { ProjectRegistrationForm } from '@frontdesk/core/interfaces/register-form';
import { VvtkApiService } from '@frontdesk/core/services';
import { Router } from '@angular/router';


@Component({
  selector: 'vvtk-project-registration',
  templateUrl: './project-registration.component.html',
  styleUrls: ['./project-registration.component.scss']
})
export class ProjectRegistrationComponent implements OnInit {

  form: FormGroup;
  loadingShow: boolean;
  Mask = false;
  showMsg = '';

  constructor(private formBuilder: FormBuilder,
    private vvtkApiService: VvtkApiService,
    private Navroute: Router
  ) {
    this.initForm();
  }

  ngOnInit() {

  }

  initForm() {
    this.form = this.formBuilder.group({
      Date: '',
      QuotationNumber: '',
      Discount: ['', Validators.required],
      ApprovedBy: ['', Validators.required],
      YOUName: ['', Validators.required],
      YOULocation: ['', Validators.required],
      YOUTypeofBusiness: ['', Validators.required],
      YOUContactName: ['', Validators.required],
      YOUContactPhone: ['', Validators.required],
      YOUContactEmail: ['', Validators.required],
      Name1: '',
      Location1: '',
      TypeofBusiness1: '',
      Name2 : '',
      Location2: '',
      TypeofBusiness2: '',
      ProjectForecast: '',
      ProjectOpportunity: '',
      SoftwarePartners: '',
      Probability: '',
      Decision: '',
      ProductDelivery: '',
      MarkupMargin: '',
      Quotations: '',
    });
  }

  doSubmit() {
    this.loadingShow = true;
    const formData = this.form.value as ProjectRegistrationForm;
    console.log('submit');
    this.vvtkApiService.post({
      path: `api/Accounts/ProjectRegistration`,
      disableLanguage: true,
      needAuth: true
    }, formData)
    .subscribe(() => {
      this.loadingShow = false;
      this.showMsg = 'Thank you for submitting the project. Our staff will respond you soon.';
      this.Mask = true;
      this.initForm();
      }
    );

  }

  redirect() {
    this.Navroute.navigateByUrl('/');
  }
}
