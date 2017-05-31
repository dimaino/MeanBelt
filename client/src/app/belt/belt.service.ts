import { Injectable } from '@angular/core';

import { Http, RequestOptions, Headers } from "@angular/http"
import { Appointment } from './belt-add/appointment'

import "rxjs"
import "rxjs/add/operator/map"


const HEADERS = new Headers({ "Content-Type": "application/json"})
const OPTIONS = new RequestOptions({ headers: HEADERS })

@Injectable()
export class BeltService {

  constructor(private http: Http) { }

  get_all_users()
  {
    return this.http.get("/allUsers")
               .map(data=> data.json())
               .toPromise()
  }

  login(name:string)
  {

    return this.http.post("/login", {name:name})
               .toPromise()
  }

  check_status()
  {
    return this.http.get("/checkStatus")
               .map(data => data.json())
               .toPromise()
  }

  logout()
  {
    return this.http.get("/logout")
               .toPromise()
  }

  new_appointment(appointment: Appointment)
  {
    return this.http.post("/addAppointment", appointment, OPTIONS)
               .toPromise()
  }
  get_all_app()
  {
    return this.http.get("/getAllAppointment")
               .map(data=> data.json())
               .toPromise()
  }
  delete_app(id:string)
  {
    return this.http.post("/delete/" + id + "", OPTIONS)
               .toPromise()
  }

}
