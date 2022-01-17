import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@frontdesk/shared/shared.module';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ContactsRoutingModule } from './contacts-routing.module';

@NgModule({
  imports: [CommonModule, ContactsRoutingModule, SharedModule],
  declarations: [ContactsComponent]
})
export class ContactsModule {}
