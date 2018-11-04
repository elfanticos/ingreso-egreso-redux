import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
/**Angular material */
import {
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatCardModule,
  MatFormFieldModule
} from '@angular/material';
/**Components */
import { AppLoginComponent } from './login/login.component';
import { AppRegisterComponent } from './register/register.component';
@NgModule({
  declarations: [
    AppLoginComponent,
    AppRegisterComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
  ]
})
export class AuthModule { }
