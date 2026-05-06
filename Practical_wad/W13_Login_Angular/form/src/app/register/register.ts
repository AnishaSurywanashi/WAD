import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
    name ='';
    phone ='';
    email ='';
    address ='';
    password ='';
     constructor(private router: Router) {
  }

  register() {
    const user ={
        name : this.name ,
        phone : this.phone ,
        email : this.email ,
        address : this.address ,
        password : this.password
    };

    localStorage.setItem('user', JSON.stringify(user));
    alert('Registration successful!');
     this.router.navigate(['/login']);   // ✅ redirect to login
  }
}
