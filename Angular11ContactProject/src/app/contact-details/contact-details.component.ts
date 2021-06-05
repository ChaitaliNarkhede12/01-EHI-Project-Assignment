import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ContactDetailsService } from '../services/contact-details/contact-details.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { ContactDetailsModel } from './_models/contact-details.model';
import { FormControl, Validators } from '@angular/forms';
import {
  RecordSaved, RecordUpdated, RecordDeleted,
  RecordNotSaved, RecordNotUpdated, RecordNotDeleted
} from '../../app/models/alerts';

import { MatDialog } from '@angular/material/dialog';
import { DeleteConfimationComponent } from '../../app/delete-confimation/delete-confimation.component';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  public contactDetilsList: ContactDetailsModel[] = [];
  public contactDetails: ContactDetailsModel = new ContactDetailsModel();
  public isCreateView: boolean = false;
  public title: string = "";

  public displayedColumns: string[] = ['action', 'firstName', 'lastName', 'email', 'phoneNumber'];

  public dataSource: MatTableDataSource<ContactDetailsModel> = new MatTableDataSource<ContactDetailsModel>();

  firstNameFormControl = new FormControl('', Validators.required);
  lastNameFormControl = new FormControl('', Validators.required);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  phoneNumberFormControl = new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]);
  statusFormControl = new FormControl('', Validators.required);

  constructor(private _contactDetailsService: ContactDetailsService,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.isCreateView = false;
    this.getContactList();
  }

  getContactList() {
    this.spinner.show();
    this.title = "Contact List";
    this.isCreateView = false;
    this._contactDetailsService.getContactList().subscribe((res: any) => {
      this.contactDetilsList = res;
      this.dataSource = new MatTableDataSource<ContactDetailsModel>(this.contactDetilsList);
      this.spinner.hide();
    }, (error) => {
      this.toastrService.error(error);
      console.log(error);
      this.spinner.hide();
    });
  }

  createContact() {
    this.title = "Create Contact";
    this.contactDetails = new ContactDetailsModel();
    this.isCreateView = true;
  }

  editContact(data: any) {
    this.spinner.show();
    this.title = "Edit Contact";
    this.isCreateView = true;
    this._contactDetailsService.getContactDetailsById(data.contactId).subscribe((res: any) => {
      this.contactDetails = res;
      this.spinner.hide();
    }, (error) => {
      this.toastrService.error(error);
      console.log(error);
      this.spinner.hide();
    });
  }

  saveContact() {
    if (this.contactDetails.contactId == 0) {
      this.addContact(this.contactDetails);
    }
    else {
      this.updateContact(this.contactDetails);
    }
  }

  addContact(contactDetails: ContactDetailsModel) {
    this._contactDetailsService.saveContactDetails(contactDetails).subscribe((res: any) => {
      if (res > 0) {
        this.toastrService.success(RecordSaved);
      }
      else {
        this.toastrService.error(RecordNotSaved);
      }

      this.backToList();
      this.spinner.hide();
    }, (error) => {
      this.toastrService.error(error);
      console.log(error);
      this.spinner.hide();
    });
  }

  updateContact(contactDetails: ContactDetailsModel) {
    this._contactDetailsService.updateContactDetails(contactDetails).subscribe((res: any) => {
      if (res > 0) {
        this.toastrService.success(RecordUpdated);
      }
      else {
        this.toastrService.error(RecordNotUpdated);
      }

      this.backToList();
      this.spinner.hide();
    }, (error) => {
        this.toastrService.error(error);
        console.log(error);
      this.spinner.hide();
    });
  }

  deleteConfimation(contactDetails: ContactDetailsModel) {
    const dialogRef = this.dialog.open(DeleteConfimationComponent, {
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result == "yes") {
        this.deleteContact(contactDetails);
      }
      else {
        this.isCreateView = false;
        this.backToList();
      }
    })
  }

  deleteContact(contactDetails: ContactDetailsModel) {
    this._contactDetailsService.deleteContactDetails(contactDetails.contactId).subscribe((res: any) => {

      if (res > 0) {
        this.toastrService.success(RecordDeleted);
      }
      else {
        this.toastrService.error(RecordNotDeleted);
      }

      this.backToList();
      this.spinner.hide();
    }, (error) => {
      this.toastrService.error(error);
      console.log(error);
      this.spinner.hide();
    });
  }

  backToList() {
    this.getContactList();
    this.isCreateView = false;
  }

}
