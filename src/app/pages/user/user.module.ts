import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ProfileComponent } from './profile/profile.component';
import { TaskComponent } from './task/task.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { AvatarModule } from 'primeng/avatar';
import { AccordionModule } from 'primeng/accordion';
import { SplitterModule } from 'primeng/splitter';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { PickListModule } from 'primeng/picklist';
import { DialogModule } from 'primeng/dialog';
import { ChipModule } from 'primeng/chip';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    UserComponent,
    ProfileComponent,
    TaskComponent,
    CreateTaskComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    InputTextModule,
    FormsModule,
    FloatLabelModule,
    ButtonModule,
    InputTextareaModule,
    DropdownModule,
    MultiSelectModule,
    CardModule,
    FieldsetModule,
    AvatarModule,
    AccordionModule,
    SplitterModule,
    ScrollPanelModule,
    PickListModule,
    DialogModule,
    ChipModule,
    InputSwitchModule,
    ToastModule
  ],
  providers: [
    MessageService
  ]
})
export class UserModule { }
