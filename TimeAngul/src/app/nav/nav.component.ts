import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService,private toastr: ToastrService,private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.toastr.success('Uspješna prijava');
    }, error => {
      this.toastr.error('Neuspješna prijava');
    },() => {
      this.router.navigate(['/activities']);
    });

    console.log(this.model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    if (token){
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('token');
    this.toastr.success('Uspješna odjava');
    this.router.navigate(['/home']);
    this.authService.userId=0;
    console.log(this.authService.userId);
  }
}
