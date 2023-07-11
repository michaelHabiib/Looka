import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';


const matrial = [MatTableModule, MatTableDataSource];



@NgModule({
  declarations: [],
  imports: [CommonModule, matrial],
  exports: [matrial],
})
export class MatrialModule { }
