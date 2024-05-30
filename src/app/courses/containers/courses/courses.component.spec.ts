import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesComponent } from './courses.component';
import { CoursesService } from '../../services/courses.service';
import { of, throwError } from 'rxjs';
import { Course } from '../../model/course';
import { MatDialog } from '@angular/material/dialog';
import { TestingModule } from './testing.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon'; // Importe o MatIconModule
import { CategoryPipe } from 'src/app/shared/pipes/category.pipe';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let coursesServiceSpy: jasmine.SpyObj<CoursesService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    const coursesServiceMock = jasmine.createSpyObj('CoursesService', ['list']);
    const dialogMock = jasmine.createSpyObj('MatDialog', ['open']);

    coursesServiceMock.list.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [
        TestingModule,
        NoopAnimationsModule, // Adicione NoopAnimationsModule
        MatTableModule, // Adicione MatTableModule
        MatIconModule // Adicione MatIconModule
      ],
      declarations: [CoursesComponent, CategoryPipe], // Declare o CategoryPipe aqui
      providers: [
        { provide: CoursesService, useValue: coursesServiceMock },
        { provide: MatDialog, useValue: dialogMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    coursesServiceSpy = TestBed.inject(CoursesService) as jasmine.SpyObj<CoursesService>;
    dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('erro ao carregar cursos', () => {
    coursesServiceSpy.list.and.returnValue(throwError(() => new Error(errorMsg)));
    const errorMsg = 'Erro ao carregar cursos.';

    fixture.detectChanges();

    const tableRows = fixture.debugElement.queryAll(By.css('table tbody tr'));


    // Verifica se o diálogo de erro foi aberto com a mensagem correta
    expect(dialogSpy.open).toHaveBeenCalledWith(ErrorDialogComponent, { data: errorMsg });

    expect(tableRows.length).toBe(0); // Valida que não criou a tabela

  });



  it('should display courses in a table when loaded', () => {
    const mockCourses: Course[] = [
      { _id: '1', name: 'Curso 1', category: 'Front-end' },
      { _id: '2', name: 'Curso 2', category: 'Back-end' },
    ];
    coursesServiceSpy.list.and.returnValue(of(mockCourses));

    fixture.detectChanges();

    const tableRows = fixture.debugElement.queryAll(By.css('table tbody tr'));
    expect(tableRows.length).toBe(2); // Verifica se duas linhas foram criadas

    // Verifica se o conteúdo das células está correto
    expect(tableRows[0].nativeElement.textContent).toContain('Curso 1');
    expect(tableRows[0].nativeElement.textContent).toContain('Front-end');
    expect(tableRows[1].nativeElement.textContent).toContain('Curso 2');
    expect(tableRows[1].nativeElement.textContent).toContain('Back-end');
  });
});
