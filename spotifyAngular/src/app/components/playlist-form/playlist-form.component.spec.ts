// src/app/components/playlists/playlist-form/playlist-form.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlaylistFormComponent } from './playlist-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { PlaylistService } from '../../services/playlist.service';
import { of } from 'rxjs';

describe('PlaylistFormComponent', () => {
  let component: PlaylistFormComponent;
  let fixture: ComponentFixture<PlaylistFormComponent>;
  let playlistServiceSpy: jasmine.SpyObj<PlaylistService>;

  beforeEach(async () => {
    playlistServiceSpy = jasmine.createSpyObj('PlaylistService', [
      'getPlaylistById',
      'addPlaylist',
      'updatePlaylist'
    ]);

    await TestBed.configureTestingModule({
      imports: [
        PlaylistFormComponent,
        ReactiveFormsModule
      ],
      providers: [
        provideRouter([]),
        { provide: PlaylistService, useValue: playlistServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PlaylistFormComponent);
    component = fixture.componentInstance;
  });

  it('should create the playlist-form component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should have form invalid when no name is provided', () => {
    fixture.detectChanges();
    component.form.controls['name'].setValue('');
    expect(component.form.valid).toBeFalse();

    const submitBtn: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitBtn.disabled).toBeTrue();
  });

  it('should enable the button when name is provided', () => {
    fixture.detectChanges();
    component.form.controls['name'].setValue('My Playlist');
    fixture.detectChanges();

    expect(component.form.valid).toBeTrue();

    const submitBtn: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitBtn.disabled).toBeFalse();
  });

  it('should display validation error when name field is empty and touched', () => {
    fixture.detectChanges();
    const nameInput: HTMLInputElement = fixture.nativeElement.querySelector('#name');
    nameInput.value = '';
    nameInput.dispatchEvent(new Event('input'));
    nameInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    const errorMsg: HTMLElement = fixture.nativeElement.querySelector('.error');
    expect(errorMsg.textContent).toContain('El nom és obligatori');
  });

  it('should call addPlaylist when form is submitted in create mode', () => {
    playlistServiceSpy.addPlaylist.and.returnValue(of({ id: 'pl-uuid', name: 'My Playlist', userId: 'user1', createdAt: '2025-06-05T10:00:00Z' }));
    fixture.detectChanges();

    component.isEditMode = false;
    component.form.controls['name'].setValue('My Playlist');
    fixture.detectChanges();

    const submitBtn: HTMLElement = fixture.nativeElement.querySelector('button[type="submit"]');
    submitBtn.click();
    expect(playlistServiceSpy.addPlaylist).toHaveBeenCalledWith({ name: 'My Playlist' });
  });
});
