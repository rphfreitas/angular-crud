import { TestBed } from '@angular/core/testing';
import { CoursesService } from './courses.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Course } from '../model/course';

describe('CoursesService', () => {
  let service: CoursesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesService]
    });

    service = TestBed.inject(CoursesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verifica se não há requisições HTTP pendentes após cada teste
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve courses from the API', () => {
    const mockCourses: Course[] = [
      { _id: '1', name: 'Curso 1', category: 'Front-end' },
      { _id: '2', name: 'Curso 2', category: 'Back-end' }
    ];

    service.list().subscribe(courses => {
      expect(courses).toEqual(mockCourses);
    });

    // Captura a requisição HTTP GET
    const req = httpTestingController.expectOne(service['API']);

    // Verifica se o método da requisição é GET
    expect(req.request.method).toEqual('GET');

    // Simula a resposta da API
    req.flush(mockCourses);
  });

  it('should handle errors when retrieving courses', () => {
    const errorMessage = 'Erro ao carregar cursos';

    service.list().subscribe(
      () => fail('should have failed with an error'),
      error => {
        expect(error.status).toBe(500); // Simula um erro 500
        expect(error.error).toBe(errorMessage);
      }
    );

    const req = httpTestingController.expectOne(service['API']);
    req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
  });
});
