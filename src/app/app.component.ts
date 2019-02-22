import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  myForm: FormGroup;
  projectStatus: string[] = ['Stable', 'Critical', 'Finished'];
  defaultProjectStatus: string = 'Stable';

  ngOnInit() {

    this.myForm = new FormGroup({
      'project': new FormControl(null, [Validators.required, this.nameValidatorAsync.bind(this)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl(this.defaultProjectStatus),
    });

  }

  // Submit the form
  submitForm() {
    console.log(this.myForm);
  }

  nameValidator(control: FormControl): {[s: string]: true} {
    if (control.value !== undefined && control.value === 'test') {
      return {'nameWrong': true};
    }
    return null;
  }

  nameValidatorAsync(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value !== undefined && control.value === 'test') {
          resolve({'nameWrong': true});
        } else {
          resolve(null);
        }
      }, 1000)
    });
    return promise;
  } 
}