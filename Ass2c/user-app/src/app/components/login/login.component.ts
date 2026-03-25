import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private readonly userService = inject(UserService);

  email = '';
  password = '';

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    const isLoginSuccess = this.userService.login(this.email, this.password);

    if (isLoginSuccess) {
      alert('Login successful!');
      form.resetForm();
      return;
    }

    alert('Invalid email or password.');
  }
}
