import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { BeltService } from "../belt.service"

@Component({
  selector: 'app-belt-dashboard',
  templateUrl: './belt-dashboard.component.html',
  styleUrls: ['./belt-dashboard.component.css']
})
export class BeltDashboardComponent implements OnInit {

  @Input() user_in_session: any;
 returnUrl:string;
 err_no_session:string;
 @Input() all_users: any[];
 @Input() all_appointments: any[];

 @Input() log_error: string[]
 @Output() login_function =new EventEmitter
 @Output() get_all_users =new EventEmitter;
 @Output() get_all_app =new EventEmitter;



 constructor(
   private beltService: BeltService,
   private route: ActivatedRoute,
   private router: Router,
 ) { }

 ngOnInit()
 {
   this.check_status()
 }


 promptFunction()
 {
   if(!this.user_in_session)
   {
     var person = prompt("Please enter your name", "");
     this.login(person)
   }
 }


 logout_function(){
   this.beltService.logout()
       .then(()=>{
         this.user_in_session=undefined
         this.check_status()
       })
       .catch(err=>{console.log("Error logout user controller")})
 }

 check_status(){
   this.beltService.check_status()
   .then(data=>{
     if(data.user){
       this.user_in_session=data.user
       console.log("USERR IS IN SESSION",this.user_in_session)
       this.get_appointments()
     }else{
       this.promptFunction()
       this.user_in_session=undefined
     }
   })
 }

 login(name:string){
   this.beltService.login(name)
     .then(()=>{
       this.check_status()
     })
     .catch(err=>{
           this.log_error=[]
           let res=JSON.parse(err._body)
           this.log_error.push(res.errors.name.message);
           this.returnUrl=this.route.snapshot.queryParams[""] || "";
           this.router.navigate([this.returnUrl])
     })
 }

 get_users(){
   this.get_all_users.emit()
 }


 get_appointments(){

   this.get_all_app.emit()
 }

 delete_app(app_id:string){

   this.beltService.delete_app(app_id)
   this.get_appointments()
 }

}
