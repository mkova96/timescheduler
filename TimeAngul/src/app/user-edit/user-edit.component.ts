import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from '../shared/models/user';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { AuthService } from '../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: []
})
export class UserEditComponent implements OnInit {
  @ViewChild('editForm',{static:true}) editForm: NgForm;
  user: User;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute, private toastr: ToastrService,
    private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
  }

  updateUser() {
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(next => {
      this.toastr.success('Profil je uspješno izmjenjen');
      this.editForm.reset(this.user);
    }, error => {
      this.toastr.error(error);
    });
  }
}
