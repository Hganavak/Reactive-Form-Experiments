import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  myFormControl: FormControl; // Used in state examples

  myFormGroup: FormGroup;

  constructor(formBuilder: FormBuilder) {
    // Email/Pass Example (FormBuilder Approach)
    this.myFormGroup = formBuilder.group(
      {
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(8)]],
        confirm_password: ["", [Validators.required, Validators.minLength(8)]],
      },
      {
        validators: [passwordMatch] // Custom validators
      }
    );


    // State Example (Imperitive Approach)
    this.myFormControl = new FormControl('Default Value', [Validators.required, Validators.minLength(9)]); // The initial value of the form element
  }
}

// Custom Validator (Simply a function that returns ValidationErrors)
// These can be created either at the group or the control level
function passwordMatch(formGroup: FormGroup) : ValidationErrors | undefined {
  const  passwordControl = formGroup.get('password');
  const confirmPasswordControl = formGroup.get('confirm_password');

  if(passwordControl.value === confirmPasswordControl.value) {
    return null;
  } else {
    return {
      passwordMatch: true // <--- This is the name of the ERROR
    }
  }

  return undefined;
}