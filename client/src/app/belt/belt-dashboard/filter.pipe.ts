import { Pipe, PipeTransform } from '@angular/core';
import { Appointment } from './../belt-add/appointment'

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(appointments: Appointment[], search: string): any
  {
    if(!appointments)
    {
      return undefined;
    }
    if(!search)
    {
      return appointments;
    }
    search = search.toLowerCase();

    return appointments.filter((app) => app.complain.toLowerCase().indexOf(search) >= 0 || app.name.toLowerCase().indexOf(search) >= 0);
  }
}
