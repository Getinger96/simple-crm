import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { User } from '../../models/user.class';
import { getFirestore, collection, addDoc, getDocs, onSnapshot,updateDoc } from "@angular/fire/firestore";
import { Firestore } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UserComponent } from '../user/user.component';
import { MatButtonModule } from '@angular/material/button';













@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [MatDialogContent,
    MatInputModule,
    CommonModule,
    MatDialogActions,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule, FormsModule, MatProgressBarModule, UserComponent,MatButtonModule],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  user: User = new User();
  birthDate!: Date;
  firestore: Firestore = inject(Firestore)
  loading = false
  allUsers: User[] = [];
  unsubList;



  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>, public dialog: MatDialog ) {
    this.unsubList = this.subList();


  }
  async saveUser() {

    this.user.birthDate = this.birthDate.getTime();
    console.log('Current user is ', this.user);
    this.loading=true
    await addDoc(this.getuserRef(), this.setUserObject(this.user,this.user.id))
    this.loading=false;
    this.dialogRef.close();
  }


  getuserRef() {
    return collection(this.firestore, 'Users')
  }

  setUserObject(obj: any,id:string): User {
    return {
      id:id,
      firstName: obj.firstName,
      lastName: obj.lastName,
      email:obj.email,
      birthDate: obj.birthDate,
      street: obj.street,
      zipCode: obj.zipCode,
      city: obj.city,

    }

  }


  subList() {
      return onSnapshot(this.getuserRef(), (user) => {
        this.allUsers = [];
        user.forEach(element => {
          this.allUsers.push(this.setUserObject(element.data(),element.id))
          console.log(element.data())
        })
      })
  
    }
    ngonDestroy() {
      this.unsubList();
    }

}


