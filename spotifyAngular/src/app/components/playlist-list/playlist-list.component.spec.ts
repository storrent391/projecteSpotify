
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlaylistListComponent } from './playlist-list.component';
import { AuthService } from '../../services/auth.service';
import { PlaylistService } from '../../services/playlist.service';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';

describe('PlaylistListComponent', () => {
  let component: PlaylistListComponent;
  let fixture: ComponentFixture<PlaylistListComponent>;
  let authServiceSpy: any;
  let playlistServiceSpy: jasmine.SpyObj<PlaylistService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    playlistServiceSpy = jasmine.createSpyObj('PlaylistService', ['getPlaylists']);

    await TestBed.configureTestingModule({
      imports: [
        PlaylistListComponent,
        CommonModule
      ],
      providers: [
        provideRouter([]),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: authServiceSpy },
        { provide: PlaylistService, useValue: playlistServiceSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistListComponent);
    component = fixture.componentInstance;
  });

  

  it('should not show "Nova Playlist" button when not logged in', () => {
    authServiceSpy.isAuthenticated.and.returnValue(false);
    playlistServiceSpy.getPlaylists.and.returnValue(of([]));
    fixture.detectChanges();

    const newBtn = fixture.nativeElement.querySelector('.new-button');
    expect(newBtn).toBeNull();
  });
});
