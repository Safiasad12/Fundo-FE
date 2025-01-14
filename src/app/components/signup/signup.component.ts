import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm!: FormGroup
  text: string = "Dummy Text"
  inputText: string = ""
  submitted: boolean = true;
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
        firstname: ['', [Validators.required, ]],
        lastname: ['', [Validators.required, ]],
        username: ['', [Validators.required, ]],
        password: ['', [Validators.required, Validators.minLength(8), ]],
        confirmPassword: ['', [Validators.required, ]],
    });
}

get signupControls() { return this.signupForm.controls; }

handleSignUp() {
  
  if(this.signupForm.status == "INVALID") {
    this.submitted = true
  }
  console.log(this.signupForm);
}

}
