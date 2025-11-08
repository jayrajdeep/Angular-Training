import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SigninComponent } from './sign-in/sign-in.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, SigninComponent, RegisterComponent],
  exports: [SigninComponent, RegisterComponent]
})
export class MembershipModule { }
