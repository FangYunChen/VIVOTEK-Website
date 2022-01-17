import { MatSelect, MatSnackBar } from '@angular/material';
import { Product, Continent, Country } from '@frontdesk/core/interfaces/compatibility';
import { CompatibilityListService } from './../compatibility-list/compatibility-list.service';
import { CompatibilityFormService } from './compatibility-form.service';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'vvtk-compatibility-form',
  templateUrl: './compatibility-form.component.html',
  styleUrls: ['./compatibility-form.component.scss']
})
export class CompatibilityFormComponent implements OnInit {
  @ViewChild('continentSelector') continentSelector: MatSelect;

  form = this.formBuilder.group({
    ContactPerson: ['', Validators.required],
    Email: ['', Validators.email],
    Continent: ['', Validators.required],
    CountryId: ['', Validators.required],
    CompatibilitySuggestionProductModels: this.formBuilder.array([
      this.formBuilder.group({
        ProductId: ['', Validators.required],
        BrandName: ['', Validators.required],
        ModelName: ['', Validators.required]
      })
    ]),
    OtherMessage: ['']
  });

  productList: Product[];
  continentList: Continent[];
  countryList: Country[];
  isLoading = false;
  get modelList() {
    return this.form.get('CompatibilitySuggestionProductModels') as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder,
    private compatibilityFormService: CompatibilityFormService,
    private compatibilityListService: CompatibilityListService,
    private router: Router,
    public snackBar: MatSnackBar
  ) {
    this.compatibilityListService.productList$.subscribe((item: Product[]) => this.productList = item);
  }

  ngOnInit() {
    this.compatibilityListService.getProducts();
    this.compatibilityFormService.getContinent().subscribe(
      (item: Continent[]) => this.continentList = item
    );
    this.continentSelector.valueChange.subscribe((id: number) => {
      this.compatibilityFormService.getCountry(id).subscribe((item: Country[]) => this.countryList = item);
      this.form.controls.CountryId.reset();
    });
  }

  createModelField() {
    return this.formBuilder.group({
      ProductId: ['', Validators.required],
      BrandName: ['', Validators.required],
      ModelName: ['', Validators.required]
    });
  }

  addModel(idx: number) {
    this.modelList.insert(idx + 1, this.createModelField());
  }

  removeModel(idx: number) {
    this.modelList.removeAt(idx);
  }

  onSubmit() {
    this.isLoading = true;
    this.compatibilityFormService.postData(this.form.value)
      .subscribe(
        _ => {
          this.snackBar.open('Your suggestion has been sent!', '', { duration: 2000, horizontalPosition: 'right' });
          this.isLoading = false;
          this.router.navigateByUrl('/support/compatibility');
        },
        _ => {
          this.snackBar.open('Faild on sending the suggestion, please submit later.', '', { duration: 2000, horizontalPosition: 'right' });
          this.isLoading = false;
        }
      );
  }
}
