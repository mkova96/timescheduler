import {Injectable} from '@angular/core';
import {User} from '../shared/models/user';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Activity } from '../shared/models/activity.model';

@Injectable()
export class UserActivityResolver implements Resolve<User> {
    constructor(private userService: UserService, private router: Router,
        private toastr: ToastrService, private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        console.log("AAA");
        return null;
        /*return this.userService.getUserActivity(this.authService.decodedToken.nameid).pipe(
            catchError(error => {
                this.toastr.error('Problem retrieving your data');
                this.router.navigate(['/users']);
                return of(null);
            })
        );*/
    }
}
