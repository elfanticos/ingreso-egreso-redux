import { AuthGuardService } from './auth/auth-guard.service';
import { dashBoardRoutes } from './dashboard/dashboard.routes';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes : Routes = [
    {path : 'login', component : LoginComponent},
    {path : 'register', component : RegisterComponent},
    {path : '', component : DashboardComponent, children : dashBoardRoutes, canActivate :  [AuthGuardService]},
    {path:'**', redirectTo:''}
]

@NgModule({
    imports : [ RouterModule.forRoot(routes)],
    exports : [ RouterModule ]
})
export class AppRoutingModule{}