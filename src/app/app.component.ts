import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  myFormControl: FormControl; // Used in state examples

  myFormGroup: FormGroup;
  myFormGroup2: FormGroup;

  constructor(formBuilder: FormBuilder) {
    // Async Validator Example
    this.myFormGroup2 = formBuilder.group(
      {
        postcode: [""]
      },
      {
        validators: [validPostCode] // You need to inject any validator dependencies here
      }
    );

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

// Custom Async Validator: Makes a REST call to an API to check if someone is in California
function validPostCode(http: HttpClient) {
  return (control: FormControl): Observable<ValidationErrors | null> => {
    return http.get<any>(`https://api.zippoptam.us/US/${control.value}`).pipe(
      map(data => data.places[0].state),
      map(stateName => stateName => stateName === 'California'),
      map(canDeliverToState => canDeliverToState ? null : { stateDelivery: 'Only Deliver to California' }),
      catchError(error => {
        return of({
          sstateDelivery: 'Unable To Verify State'
        });
      })
    )
  } 

}