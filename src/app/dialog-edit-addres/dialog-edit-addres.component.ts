import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { User } from '../../models/user.class';
import { getFirestore, collection, addDoc, getDocs, onSnapshot, doc, Unsubscribe, updateDoc } from "@angular/fire/firestore";
import { Firestore } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UserComponent } from '../user/user.component';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dialog-edit-addres',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatDialogContent, MatFormFieldModule, MatProgressBarModule, MatDialogActions, FormsModule, MatInputModule],
  templateUrl: './dialog-edit-addres.component.html',
  styleUrl: './dialog-edit-addres.component.scss'
})
export class DialogEditAddresComponent {
  loading = false;
  userId: string;
  user!: User;
  firestore: Firestore = inject(Firestore);


  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<DialogEditAddresComponent>, private route: ActivatedRoute) {
    
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
      street: user.street,
      zipCode: user.zipCode,
      city: user.city,

    }
  }




  getSingleUserRef(docId: string) {
    return doc(collection(this.firestore, 'Users'), docId)
  }


}
