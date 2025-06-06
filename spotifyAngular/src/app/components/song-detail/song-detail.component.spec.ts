// src/app/components/song-detail/song-detail.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SongDetailComponent } from './song-detail.component';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { SongService } from '../../services/song.service';
import { of, throwError } from 'rxjs';
import { Song } from '../../models/song.model';

describe('SongDetailComponent', () => {
  let component: SongDetailComponent;
  let fixture: ComponentFixture<SongDetailComponent>;
  let songServiceSpy: jasmine.SpyObj<SongService>;
  const mockActivatedRoute = {
    snapshot: { paramMap: { get: () => 'uuid-1' } }
  };

  beforeEach(async () => {
    songServiceSpy = jasmine.createSpyObj('SongService', ['getSongById']);

    await TestBed.configureTestingModule({
      imports: [SongDetailComponent],
      providers: [
        provideRouter([]),
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: SongService, useValue: songServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SongDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create the song-detail component', () => {
    songServiceSpy.getSongById.and.returnValue(of({ id: 'uuid-1', title: 'Test', artist: 'Tester', userId: 'user1' }));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load song on init', () => {
    const mockSong: Song = { id: 'uuid-1', title: 'Song One', artist: 'Artist A', userId: 'user1' };
    songServiceSpy.getSongById.and.returnValue(of(mockSong));

    fixture.detectChanges(); 

    expect(component.song).toEqual(mockSong);
  });

  it('should display error message on load failure', () => {
    songServiceSpy.getSongById.and.returnValue(throwError(() => ({ error: { message: 'No s’ha pogut carregar la cançó' } })));

    fixture.detectChanges();

    expect(component.errorMsg).toContain('No s’ha pogut carregar la cançó');
  });
});
