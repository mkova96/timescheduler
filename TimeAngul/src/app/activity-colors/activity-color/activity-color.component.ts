import { Component, OnInit } from '@angular/core';
import { ActivityColor } from 'src/app/shared/models/activity-color.model';
import { ActivityColorService } from 'src/app/shared/services/activity-color.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-activity-color',
  templateUrl: './activity-color.component.html',
  styles: []
})
export class ActivityColorComponent implements OnInit {

  constructor(private service: ActivityColorService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = {
      ActivityColorId: 0,
      ActivityColorName: ''
    }
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.ActivityColorId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postActivityColor().subscribe(
      res => {
        debugger;
        this.resetForm(form);
        this.toastr.success('Submitted successfully', 'Payment Detail Register');
        this.service.refreshList();
      },
      err => {
        debugger;
        console.log(err);
      }
    )
  }
  updateRecord(form: NgForm) {
    this.service.putActivityColor().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Submitted successfully', 'Payment Detail Register');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }

}
