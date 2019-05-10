import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  myFormControl: FormControl;

  constructor() {
    this.myFormControl = new FormControl('Default Value', [Validators.required, Validators.minLength(9)]); // The initial value of the form element
  }
}
