import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/**Componentes */
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
/**Angular material */
import {
  MatButtonModule, 
  MatCheckboxModule,
  MatToolbarModule,
  MatSidenavModule
} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ],
  exports : [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
