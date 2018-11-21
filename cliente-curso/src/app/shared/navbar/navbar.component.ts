import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/user.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {
  user_subscription:Subscription = new Subscription();
  user:User = new User();
  constructor(
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

}
