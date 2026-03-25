import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  private readonly userService = inject(UserService);

  user: User | null = null;

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }
}
