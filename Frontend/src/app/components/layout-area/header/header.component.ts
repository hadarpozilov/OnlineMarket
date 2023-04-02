import { Component, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { UserModel } from 'src/app/models/user-model';
import store from 'src/app/redux/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public user: UserModel;
  private unsubscribeUser: Unsubscribe;

  ngOnInit(): void {
    this.user = store.getState().authState.user;
    this.unsubscribeUser = store.subscribe(() => {
      this.user = store.getState().authState.user;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeUser();
  }
}
