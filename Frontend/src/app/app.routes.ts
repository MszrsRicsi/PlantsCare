import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WateringsComponent } from './components/waterings/waterings.component';
import { PlantsComponent } from './components/plants/plants.component';

export const routes: Routes = [
    {
        path: "", redirectTo: "dashboard", pathMatch: "full"
    },
    {
        path: "dashboard", component: DashboardComponent
    },
    {
        path: "waterings", component: WateringsComponent
    },
    {
        path: "plants", component: PlantsComponent
    }
];
