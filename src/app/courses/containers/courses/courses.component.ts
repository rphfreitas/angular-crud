import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';

import { Course } from '../../model/course';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>;

  constructor(private coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
    public location: Location
  ) {
    this.courses$ = of([]);
  }

  ngOnInit() {
    this.refresh();
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  refresh() {
    this.courses$ = this.coursesService.list().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar cursos.');
        return of([]);
      })
    );
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(course: Course) {
    this.router.navigate(['edit', course._id], { relativeTo: this.route });
  }

  onDelete(course: Course) {
    this.coursesService.delete(course._id).subscribe({
      next: () => {
        this.snackbar.open("Curso deletado com sucesso", 'X', { duration: 8000, verticalPosition: 'top', direction: 'ltr' });
        this.refresh();
      },
      error: () => this.onError('erro ao deletar curso')
    });
  }

}
