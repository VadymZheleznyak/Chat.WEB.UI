import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/shared/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private service: UserService, private toastr: ToastrService, private router: Router) { }

  

  ngOnInit() {
    if(localStorage.getItem('token'))
      this.router.navigateByUrl('/home'); 
  }

  onSubmit(){
    this.service.register().subscribe(
      (res: any) => {
        if(res.Result){
          this.service.formModel.reset();
          this.toastr.success('Submitted successfully', 'User Register');
        }
      }, err => {
        this.toastr.error('Error', err);
      }
    )
  }
}
