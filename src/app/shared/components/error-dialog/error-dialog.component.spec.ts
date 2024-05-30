import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorDialogComponent } from './error-dialog.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

describe('ErrorDialogComponent', () => {
  let component: ErrorDialogComponent;
  let fixture: ComponentFixture<ErrorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorDialogComponent],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: 'Erro de teste' }],
    }).overrideComponent(ErrorDialogComponent, { // Sobrescreva o template aqui
      set: { template: '<div class="error-message">{{ data }}</div>' },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the error message passed through MAT_DIALOG_DATA', () => {
    const errorMessageElement = fixture.debugElement.query(By.css('.error-message')); // Ajuste o seletor CSS se necessário
    expect(errorMessageElement.nativeElement.textContent).toBe('Erro de teste');
  });
});
