import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  model2: any = {};


  constructor(private authService: AuthService, private toastr: ToastrService,private router: Router) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe(() => {
      this.toastr.success('Uspješna registracija');
      this.login();
    }, error => {
      console.log(error);
      this.toastr.error('Neupješna registracija');
    });
  }

  
  login() {
    this.authService.login({email: this.model.email, password: this.model.password}).subscribe(next => {
      this.toastr.success('Uspješna prijava');
    }, error => {
      this.toastr.error('Neuspješna prijava');
    },() => {
      this.router.navigate(['/activities']);
    });

    console.log(this.model);
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
