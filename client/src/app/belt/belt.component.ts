import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BeltService } from './belt.service';

import "rxjs";

@Component({
  selector: 'app-belt',
  templateUrl: './belt.component.html',
  styleUrls: ['./belt.component.css']
})
export class BeltComponent implements OnInit {



  user_in_session: object;
  all_users: any[];
  all_appointments: any[];

  returnUrl:string;
  log_error: string[];


  constructor(
      private beltService: BeltService,
      private route: ActivatedRoute,
      private router: Router,
  ) { }

  ngOnInit()
  {
    this.check_status()
    this.get_all_users()
  }

  get_all_users()
  {
    this.beltService.get_all_users()
        .then((data) =>
        {
          this.all_users=data
        })
        .catch((err)=>
        {
          console.log("Error getting users", err)
        })
  }

  login(name)
  {
    this.beltService.login(name)
        .then(() =>
        {
          this.check_status()
        })
        .catch(err =>
        {
          this.log_error=[]
          let res=JSON.parse(err._body)
          this.log_error.push(res.errors.name.message);
          this.returnUrl=this.route.snapshot.queryParams[""] || "";
          this.router.navigate([this.returnUrl])
        })
  }


  check_status()
  {
    this.beltService.check_status()
        .then(data =>
        {
          if(data.user)
          {
            this.user_in_session = data.user
            this.returnUrl = this.route.snapshot.queryParams[""] || "";
            this.router.navigate([this.returnUrl])
          }
          else
          {
            this.user_in_session = undefined
          }
        })
        .catch(err =>
        {
          console.log("Check Status Error: ", err)
        })
  }

  logout()
  {
    this.beltService.logout()
        .then(() =>
        {
          this.check_status()
        })
        .catch(err =>
        {
          console.log("Error logout user controller")
        })
  }


  get_all_app()
  {
    this.beltService.get_all_app()
        .then((data) =>
        {
          this.all_appointments = data
        })
        .catch((err) =>
        {
          console.log("Error getting users", err)
        })
  }

}
