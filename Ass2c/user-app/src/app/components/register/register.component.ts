import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private readonly userService = inject(UserService);

  user: User = {
    username: '',
    email: '',
    password: ''
  };

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    this.userService.register(this.user);
    alert('Registration successful!');

    form.resetForm();
  }
}
