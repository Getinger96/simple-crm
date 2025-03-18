import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { User } from '../../models/user.class';
import { getFirestore, collection, addDoc, getDocs, onSnapshot, doc, updateDoc } from "@angular/fire/firestore";
import { Firestore } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UserComponent } from '../user/user.component';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatDialogContent, MatFormFieldModule, MatProgressBarModule, MatDialogActions, FormsModule, MatInputModule, MatDatepickerModule],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent {
  loading = false;
  user!: User;
  userId: string = '';
  firestore: Firestore = inject(Firestore);
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<DialogEditUserComponent>, private route: ActivatedRoute) {

    const id = this.route.snapshot.paramMap.get('id');
    this.userId = id ? id : '';
    console.log(this.userId);
  }

  async saveUser() {
    this.loading = true
    let docref = this.getSingleUserRef(this.userId)
    await updateDoc(docref, this.getCleanJson(this.user))
    this.loading = false;
    this.dialogRef.close();
  }

  getCleanJson(user: User): {} {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,

    }
  }




  getSingleUserRef(docId: string) {
    return doc(collection(this.firestore, 'Users'), docId)
  }


}
