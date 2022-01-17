import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
export const validator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const mode = control.get('mode');
  const mainCategoryName = control.get('mainCategoryName');
  const mainCategoryId = control.get('mainCategoryId');
  const subCategoryName = control.get('subCategoryName');
  if (mode.value === 'main') {
    return mainCategoryName.value.length !== 0 ? null : { 'isValueEmpty': true };
  } else {
    return mainCategoryId.value !== '' && subCategoryName.value.length !== 0 ? null : { 'isValueEmpty': true };
  }
};
