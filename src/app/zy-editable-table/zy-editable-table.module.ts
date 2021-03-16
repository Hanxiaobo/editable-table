import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZyEditableTableComponent } from './zy-editable-table.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SortablejsModule } from 'ngx-sortablejs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [ZyEditableTableComponent],
  imports: [
    CommonModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    SortablejsModule,
    MatCheckboxModule,
    MatSelectModule,
    BrowserAnimationsModule
  ],
  exports: [
    ZyEditableTableComponent
  ]
})
export class ZyEditableTableModule { }
