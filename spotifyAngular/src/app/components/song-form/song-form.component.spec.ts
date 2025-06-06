// src/app/components/songs/song-form/song-form.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SongFormComponent } from './song-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { SongService } from '../../services/song.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('SongFormComponent', () => {
  let component: SongFormComponent;
  let fixture: ComponentFixture<SongFormComponent>;
  let songServiceSpy: jasmine.SpyObj<SongService>;

  beforeEach(async () => {
    songServiceSpy = jasmine.createSpyObj('SongService', [
      'getSongById',
      'addSong',
      'updateSong'
    ]);

    await TestBed.configureTestingModule({
      imports: [
        SongFormComponent,
        ReactiveFormsModule
      ],
      providers: [
        provideRouter([]),
        provideHttpClientTesting(),
      ]
    })
    .overrideProvider(SongService, { useValue: songServiceSpy })
    .compileComponents();

    fixture = TestBed.createComponent(SongFormComponent);
    component = fixture.componentInstance;
  });

  

  it('should have form invalid when no data is provided', () => {
    fixture.detectChanges();
    component.form.controls['title'].setValue('');
    component.form.controls['artist'].setValue('');
    expect(component.form.valid).toBeFalse();

    const submitBtn: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitBtn.disabled).toBeTrue();
  });

  it('should enable the button when valid data is provided', () => {
    fixture.detectChanges();
    component.form.controls['title'].setValue('Imagine');
    component.form.controls['artist'].setValue('John Lennon');
    fixture.detectChanges();

    expect(component.form.valid).toBeTrue();

    const submitBtn: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitBtn.disabled).toBeFalse();
  });

  it('should display validation error when title is empty and touched', () => {
    fixture.detectChanges();
    const titleInput: HTMLInputElement = fixture.nativeElement.querySelector('#title');
    titleInput.value = '';
    titleInput.dispatchEvent(new Event('input'));
    titleInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    const errorMsg: HTMLElement = fixture.nativeElement.querySelector('.error');
    expect(errorMsg.textContent).toContain('El títol és obligatori');
  });

  it('should call addSong when form is submitted in create mode', () => {
    songServiceSpy.addSong.and.returnValue(of({ id: 'uuid', title: 'Test', artist: 'Tester', userId: 'user1' }));
    fixture.detectChanges();

    component.isEditMode = false;
    component.form.controls['title'].setValue('Test');
    component.form.controls['artist'].setValue('Tester');
    fixture.detectChanges();

    const submitBtn: HTMLElement = fixture.nativeElement.querySelector('button[type="submit"]');
    submitBtn.click();
    expect(songServiceSpy.addSong).toHaveBeenCalledWith({ title: 'Test', artist: 'Tester' });
  });
});
