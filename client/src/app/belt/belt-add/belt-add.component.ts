import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { Appointment } from './appointment'
import { BeltService } from "../belt.service"

@Component({
  selector: 'app-belt-add',
  templateUrl: './belt-add.component.html',
  styleUrls: ['./belt-add.component.css']
})
export class BeltAddComponent implements OnInit {

  new_app:Appointment;
  log_error:string[];
  user_in_session:string
  returnUrl:string

  constructor(
    private beltService: BeltService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.new_app=new Appointment
    this.check_status()
  }

  new_appointment(){
    console.log("YOU ENTERED THIS: ", this.new_app.time);
    this.log_error=[]
    this.beltService.new_appointment(this.new_app)
            .then(()=>{
              console.log("SUCCESFULLY ADDED APPOINTMENT")
              this.returnUrl=this.route.snapshot.queryParams[""] || "";
              this.router.navigate([this.returnUrl])
            })
            .catch(err=>{
              this.log_error=[]
              let res=JSON.parse(err._body)
              console.log("!!!!!!!!!!!!!!!!", res.err)
              if(res.err){
                this.log_error.push(res.err)
              }
              if(res.errors.complain){
                this.log_error.push(res.errors.complain.message)
              }
              if(res.errors.date){
                this.log_error.push(res.errors.date.message)
              }
              if(res.errors.time){
                this.log_error.push(res.errors.time.message)
              }
              this.returnUrl=this.route.snapshot.queryParams["add"] || "add";
              this.router.navigate([this.returnUrl])
            })
  }

  check_status(){
  this.beltService.check_status()
  .then(data=>{
      this.user_in_session=data
      console.log("USER IS IN SESSION", this.user_in_session)
  })
  .catch(err=>{
    console.log("ERROR LOGING")
    this.returnUrl=this.route.snapshot.queryParams[""] || "";
    this.router.navigate([this.returnUrl])

  })
}

}
