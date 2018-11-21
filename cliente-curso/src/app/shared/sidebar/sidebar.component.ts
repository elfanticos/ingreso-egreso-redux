import { User } from 'src/app/auth/user.model';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthService } from './../../auth/auth.service';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthState } from 'src/app/auth/auth.reducer';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {
  user_subscription:Subscription = new Subscription();
  user:User = new User();
  constructor(
    public _authService : AuthService,
    private _store : Store<AppState>
  ) { }

  ngOnInit():void {
    this.user_subscription = this._store.select('auth')
    .pipe(filter(fil => fil.user != null))
    .subscribe(auth => {
      this.user = auth.user;
    });
  }

  ngOnDestroy():void {
    this.user_subscription.unsubscribe();
  }

  logout():void {
    this._authService.logout();
  }
}
