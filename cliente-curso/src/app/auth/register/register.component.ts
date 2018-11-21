import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit , OnDestroy {
  cargando:boolean;
  subscription : Subscription = new Subscription();
  constructor(
    public _authService : AuthService,
    private _store:Store<AppState>
  ) { }

  ngOnInit() {
    this.subscription = this._store.select('ui').subscribe(ui=> this.cargando = ui.isLoading);
  }

  ngOnDestroy():void {
    this.subscription.unsubscribe();
  }

  onSubmit(data:any) {
    this._authService.crearUsuario(data);
  }

}
