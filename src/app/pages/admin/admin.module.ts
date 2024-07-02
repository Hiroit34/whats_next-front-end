import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { CardModule } from 'primeng/card';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateTaskComponent } from './create-task/create-task.component';
import { AdminTaskComponent } from './admin-task/admin-task.component';
import { FieldsetModule } from 'primeng/fieldset';
import { AvatarModule } from 'primeng/avatar';
import { AccordionModule } from 'primeng/accordion';
import { SplitterModule } from 'primeng/splitter';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { PickListModule } from 'primeng/picklist';
import { DialogModule } from 'primeng/dialog';
import { ChipModule } from 'primeng/chip';
import { BadgeModule } from 'primeng/badge';
import { CategoryAdminComponent } from './category-admin/category-admin.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    AdminComponent,
    CreateTaskComponent,
    AdminTaskComponent,
    CategoryAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FloatLabelModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    InputTextareaModule,
    DropdownModule,
    MultiSelectModule,
    CardModule,
    ReactiveFormsModule,
    FieldsetModule,
    AvatarModule,
    AccordionModule,
    SplitterModule,
    ScrollPanelModule,
    PickListModule,
    DialogModule,
    ChipModule,
    BadgeModule,
    ToastModule,
    ConfirmPopupModule
  ],
  providers: [
    ConfirmationService,
    MessageService
  ]
})
export class AdminModule { }
