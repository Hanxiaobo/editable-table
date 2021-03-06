import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ZyEditableTableModule } from './zy-editable-table/zy-editable-table.module';

import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SortablejsModule } from 'ngx-sortablejs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
		SortablejsModule.forRoot({ animation: 150 }),
    ZyEditableTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
