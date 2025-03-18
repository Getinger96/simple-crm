import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, MatDialog, MatDialogActions } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import { MatCardModule } from '@angular/material/card';
import { collection, Firestore, onSnapshot, doc } from '@angular/fire/firestore';
import { RouterLink, RouterModule } from '@angular/router';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIcon, MatTooltipModule, MatDialogModule, MatCardModule,RouterLink,RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

 user : User= new User();
  firestore: Firestore = inject(Firestore)
  
  allUsers: User[] = [];
  singleUser:User[]=[];

  unsubList;
 

  constructor(public dialog: MatDialog) {

    

    this.unsubList = this.subList();
    




  }

  

  subList() {
    return onSnapshot(this.getuserRef(), (user) => {
      this.allUsers = [];
      user.forEach(element => {
        this.allUsers.push(this.setUserObject(element.data(),element.id))
        console.log(element.data(),element.id)
      })
    })

  }

  ngonDestroy() {
    this.unsubList();
  }

  opendialog() {
    this.dialog.open(DialogAddUserComponent)
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
}

