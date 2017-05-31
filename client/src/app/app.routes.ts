import { Routes, RouterModule } from "@angular/router";
// Import Components
import { BeltComponent } from './belt/belt.component';
import { BeltAddComponent } from './belt/belt-add/belt-add.component';
import { BeltDashboardComponent } from './belt/belt-dashboard/belt-dashboard.component';

const APP_ROUTES: Routes = [
  { path: "", component: BeltComponent },
  { path: "dashboard", component: BeltDashboardComponent },
  { path: "add", component: BeltAddComponent },
];
export const routing = RouterModule.forRoot(APP_ROUTES);
