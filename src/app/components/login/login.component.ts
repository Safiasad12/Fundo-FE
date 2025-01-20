import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http-service/http.service';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent {
  loginForm!: FormGroup;

  // inputText: string = ""

  submitted: boolean = false

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router:Router ) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
        });
    }

    get loginControls() { return this.loginForm.controls; }

  handleLogin() {
    const {email, password} = this.loginForm.value
    if(this.loginForm.status == "INVALID") {
      this.submitted = true
    } else {

    
      this.userService.loginApiCall({email, password}).subscribe({
        next: (res: any) => {
          console.log(res);
          localStorage.setItem("authToken", res.token)
          this.router.navigate(["/dashboard/notes"])
          
        },
        error: (err) => {
          console.log(err);
          
        }
      });
      
    }
  }
}
