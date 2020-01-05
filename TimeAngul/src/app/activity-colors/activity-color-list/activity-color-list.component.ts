import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivityColorService } from 'src/app/shared/services/activity-color.service';
import { ActivityColor } from 'src/app/shared/models/activity-color.model';

@Component({
  selector: 'app-activity-color-list',
  templateUrl: './activity-color-list.component.html',
  styles: []
})
export class ActivityColorListComponent implements OnInit {

  constructor(private service: ActivityColorService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(pd: ActivityColor) {
    this.service.formData = Object.assign({}, pd);
  }

  onDelete(ActivityColorId) {
    if (confirm('Are you sure to delete this record ?')) {
      this.service.deleteActivityColor(ActivityColorId)
        .subscribe(res => {
          debugger;
          this.service.refreshList();
          this.toastr.warning('Deleted successfully', 'Payment Detail Register');
        },
          err => {
            debugger;
            console.log(err);
          })
    }
  }
}
