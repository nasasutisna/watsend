import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  exports: [InputComponent],
  declarations: [InputComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class ComponentModule { }
