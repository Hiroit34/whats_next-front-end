import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ButtonModule } from 'primeng/button';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { FooterComponent } from '../../main-components/footer/footer.component';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ScrollTopModule } from 'primeng/scrolltop';


@NgModule({
  declarations: [
    HomeComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ButtonModule,
    AnimateOnScrollModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    ScrollTopModule
  ]
})
export class HomeModule { }
