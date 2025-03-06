import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogActions, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { User } from '../../models/user.class';
import { getFirestore, collection, addDoc, getDocs } from "@angular/fire/firestore";
import { Firestore } from '@angular/fire/firestore';











@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [MatDialogContent,
    MatInputModule,
    CommonModule,
    MatDialogActions,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,FormsModule,],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  user = new User();
  birthDate!: Date;
  firestore: Firestore = inject(Firestore)
  
  
 
  constructor(public dialog: MatDialog) {

  

  }

  saveUser() {

    this.user.birthDate=this.birthDate.getTime();
    console.log('current User', this.user)
    addDoc(this.getUserRef(),this.user.toJson())
   

  }

   getUserRef(){
    return collection(this.firestore,'Users')
  }
}

