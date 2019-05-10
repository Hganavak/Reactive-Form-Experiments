import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  myFormControl: FormControl;

  constructor() {
    this.myFormControl = new FormControl('Name'); // The initial value of the form element
  }
}
