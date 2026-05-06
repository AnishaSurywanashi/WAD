import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
   user : any = {};

   ngOnInit(){
     const data = localStorage.getItem('user');


    if (data) {
      this.user = JSON.parse(data);   // ✅ convert string → object
    } else {
      console.log('No user data found');
    }
   }
}
