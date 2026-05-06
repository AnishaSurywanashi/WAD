import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email ='';
   password ='';

   constructor(private router : Router ) {}

   login(){
    const user =  JSON.parse(localStorage.getItem("user") || '{}');

    if(this.email === user.email && this.password === user.password){
      alert('Login successful!');
      this.router.navigate(['/profile']);
    }else{
      alert("Invalid Login");
    }
   }

}
