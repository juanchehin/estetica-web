import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VouchersRoutingModule } from './vouchers-routing.module';
import { RouterModule } from '@angular/router';

import { VouchersComponent } from './vouchers/vouchers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    VouchersRoutingModule,
    RouterModule,
    AutocompleteLibModule,
    ReactiveFormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    VouchersComponent    
  ]
})
export class VouchersModule { }
