import { ApiService } from './../shared/api.service';
import { EmployeeModel } from './dashboard.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from'@angular/forms'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  formValue: FormGroup = new FormGroup({})
  employeeModelObj:EmployeeModel = new EmployeeModel()
  employeeData:any=[]
  editing=false

  constructor(private formbuilder:FormBuilder, private api:ApiService) {

   }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName:'',
      lastName:'',
      email:'',
      phone:0,
      salary:''
    })
    this.getAll()
  }

  createEmployee(){
    this.employeeModelObj.firstName = this.formValue.value.firstName
    this.employeeModelObj.lastName = this.formValue.value.lastName
    this.employeeModelObj.email = this.formValue.value.email
    this.employeeModelObj.phone = this.formValue.value.phone
    this.employeeModelObj.salary = this.formValue.value.salary

    this.api.post(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res)
      alert('Added Succesfull')
      this.formValue.reset()
    },
    err=>{
      alert(err.mesaage)
    })
    this.getAll()
  }

  cancel(){
    this.formValue.reset()
  }

  getAll(){
    this.api.get()
    .subscribe(res=>{
      this.employeeData = res
    })
  }

  delete(id:number){
    this.api.dalete(id)
    .subscribe(res=>{
      console.log('deleted')
    })
    this.getAll()
  }

  edit(item:EmployeeModel){
    this.editing = true
    this.employeeModelObj.id = item.id
    this.formValue.controls['firstName'].setValue(item.firstName)
    this.formValue.controls['lastName'].setValue(item.lastName)
    this.formValue.controls['email'].setValue(item.email)
    this.formValue.controls['phone'].setValue(item.phone)
    this.formValue.controls['salary'].setValue(item.salary)
  }

  update(){
    this.employeeModelObj.firstName = this.formValue.value.firstName
    this.employeeModelObj.lastName = this.formValue.value.lastName
    this.employeeModelObj.email = this.formValue.value.email
    this.employeeModelObj.phone = this.formValue.value.phone
    this.employeeModelObj.salary = this.formValue.value.salary
    console.log(this.employeeModelObj)

    this.api.update(this.employeeModelObj, this.employeeModelObj.id)
    .subscribe(res=>{
      console.log('sucess')
      this.formValue.reset()
    })
    this.editing = false
    this.getAll()
  }
}
