import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [MatDialogModule, MatCardModule, MatToolbarModule],
  exports: [MatDialogModule, MatCardModule, MatToolbarModule],
})
export class TestingModule { }
