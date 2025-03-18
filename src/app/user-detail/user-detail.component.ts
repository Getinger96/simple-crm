import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, MatDialog, MatDialogActions } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import { MatCardModule } from '@angular/material/card';
import { collection, Firestore, onSnapshot ,doc, Unsubscribe} from '@angular/fire/firestore';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import { DialogEditAddresComponent } from '../dialog-edit-addres/dialog-edit-addres.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule,MatIcon,MatButtonModule,MatMenuModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {

  userId: string;
  user: User = new User();
  actualUser:User[]=[];
  unsubList: Unsubscribe;
 
  

  firestore: Firestore = inject(Firestore)

  constructor(private route: ActivatedRoute,public dialog: MatDialog) {
    const id = this.route.snapshot.paramMap.get('id');
    this.userId = id ? id : '';
    console.log(this.userId);
   
    this.unsubList = this.subList(this.userId);
  }

  ngOnInit(): void {
    
    
  }

  subList(docId:string) {
    return onSnapshot( this.getSingleUserRef(docId), (user) => {
      this.user= this.setUserObject(user.data(),docId)
      console.log(this.user)
    
    
    })

  }
  ngonDestroy() {
    this.unsubList();
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
  




  getSingleUserRef(docId:string){
    return doc(collection(this.firestore,'Users'),docId)
  }




  editMenu(){
const dialog=this.dialog.open(DialogEditAddresComponent);
dialog.componentInstance.user=new User(this.user);
dialog.componentInstance.userId=this.userId;
  }

  editUserDetail(){
   const dialog= this.dialog.open(DialogEditUserComponent);
   dialog.componentInstance.user=new User(this.user),
   dialog.componentInstance.userId=this.userId;
   

  }

  

  

  

}