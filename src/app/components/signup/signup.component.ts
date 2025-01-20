import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user-service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm!: FormGroup
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstname: ['', [Validators.required,]],
      lastname: ['', [Validators.required,]],
      username: ['', [Validators.required,]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8),]],
    });
  }

  get signupControls() { return this.signupForm.controls; }


  handleSignUp() {
    this.submitted = true



    const { firstname, lastname, username, email, password } = this.signupForm.value

    console.log(this.signupForm.value)



    if (this.signupForm.status == "VALID") {
      this.userService.signupApiCall({ firstname, lastname, username, email, password }).subscribe({
        next: (res: any) => {
          console.log(res);

          this.router.navigate([""])


        },
        error: (err) => {

          console.log(err);

        }
      });

    }
  }

}
