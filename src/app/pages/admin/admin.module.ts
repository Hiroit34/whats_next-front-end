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


@NgModule({
  declarations: [
    AdminComponent,
    CreateTaskComponent,
    AdminTaskComponent
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
    PickListModule
  ]
})
export class AdminModule { }
