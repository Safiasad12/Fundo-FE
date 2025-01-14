import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent {
  loginForm!: FormGroup;

  text: string = "Dummy Text"
  inputText: string = ""
  submitted: boolean = false

  constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    get loginControls() { return this.loginForm.controls; }

  handleLogin() {
    const {email, password} = this.loginForm.value
    if(this.loginForm.status == "INVALID") {
      this.submitted = true
    }
    console.log(this.loginForm);
  }
}
