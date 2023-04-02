import { Router } from '@angular/router';
import { UserModel } from './../../../models/user-model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';
import { FormGroup } from '@angular/forms';
import { CityModel } from 'src/app/models/city-model';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public cities: CityModel[];
  public user = new UserModel();
  public confirmPassword: string;
  public stepOneOk: boolean = false;
  public emailForm: FormGroup;

  constructor(
    private checkoutService: CheckoutService,
    private authService: AuthService,
    private notify: NotifyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchCities();
  }

  public async fetchCities() {
    try {
      this.cities = await this.checkoutService.getAllCities();
    } catch (err: any) {
      this.notify.error(err);
    }
  }

  public async checkUserId() {
    try {
      const result = await this.authService.isUserIdFree(this.user.userId);

      if (result) {
        this.stepOneOk = true;
      }
      this.notify.success('משתמש זה ניתן לשימוש');
    } catch (err: any) {
      this.notify.error(err);
    }
  }

  public async submit() {
    try {
      const passOK = this.checkPassword();
      if (passOK) {
        console.log('הסיסמא הושלמה.');
        await this.authService.register(this.user);
        this.notify.success('נרשמת בהצלחה');
        this.router.navigateByUrl('/home');
      }
    } catch (err: any) {
      this.notify.error(err);
    }
  }

  checkPassword() {
    if (this.confirmPassword === this.user.password) {
      return true;
    }
    console.log('הסיסמא לא בוצעה');
    return false;
  }
}
