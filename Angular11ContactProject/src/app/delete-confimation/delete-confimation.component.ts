import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confimation',
  templateUrl: './delete-confimation.component.html',
  styleUrls: ['./delete-confimation.component.scss']
})
export class DeleteConfimationComponent implements OnInit {
  constructor(private matDialogRef: MatDialogRef<any>) { }
  ngOnInit(): void { }

  yesClick() {
    this.matDialogRef.close("yes");
  }
  noClick() {
    this.matDialogRef.close("no");
  }


}
