import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { CoursesService } from '../../services/courses.service';
import { Course } from '../../model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form = this.formBuilder.group({
    _id: [''],
    name: ['', [Validators.required, Validators.minLength(3)]],
    category: ['', [Validators.required, this.categoryValidator]]
  });

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private location: Location,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];
    this.form.setValue(course);
  }

  onSubmit() {
    if (this.form.valid) {
      this.service.save(this.form.value).subscribe({
        next: resultado => this.onSuccess(),
        error: error => this.onError()
      });
    }
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.onCancel();
    this.snackbar.open("Curso salvo com sucesso!", undefined, { duration: 8000 });
  }

  private onError() {
    this.snackbar.open("Erro ao salvar curso!", undefined, { duration: 8000 });
  }

  private categoryValidator(control: AbstractControl): ValidationErrors | null {
    const validCategories = ['back-end', 'front-end'];
    if (validCategories.includes(control.value.toLowerCase())) {
      return null;
    }
    return { invalidCategory: true };
  }
}
