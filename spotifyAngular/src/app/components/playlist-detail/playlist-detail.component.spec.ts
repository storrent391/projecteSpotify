// src/app/components/playlist-detail/playlist-detail.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlaylistDetailComponent } from './playlist-detail.component';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { PlaylistService } from '../../services/playlist.service';
import { SongService } from '../../services/song.service';
import { AuthService } from '../../services/auth.service';
import { of, throwError } from 'rxjs';
import { Playlist } from '../../models/playlist.model';
import { Song } from '../../models/song.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('PlaylistDetailComponent', () => {
  let component: PlaylistDetailComponent;
  let fixture: ComponentFixture<PlaylistDetailComponent>;
  let playlistServiceSpy: jasmine.SpyObj<PlaylistService>;
  let songServiceSpy: jasmine.SpyObj<SongService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  const mockActivatedRoute = {
    snapshot: { paramMap: { get: () => 'pl-1' } }
  };

  beforeEach(async () => {
    playlistServiceSpy = jasmine.createSpyObj('PlaylistService', [
      'getPlaylistById',
      'getSongsInPlaylist',
      'addSongToPlaylist',
      'removeSongFromPlaylist'
    ]);
    songServiceSpy = jasmine.createSpyObj('SongService', ['searchSongs']);
    authServiceSpy = jasmine.createSpyObj('AuthService', [], {
      currentUser: { id: 'user1', username: 'testuser', email: 'test@example.com' }
    });

    await TestBed.configureTestingModule({
      imports: [
        PlaylistDetailComponent,
        CommonModule,
        FormsModule
      ],
      providers: [
        provideRouter([]),
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: PlaylistService, useValue: playlistServiceSpy },
        { provide: SongService, useValue: songServiceSpy },
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PlaylistDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create the playlist-detail component', () => {
    playlistServiceSpy.getPlaylistById.and.returnValue(of({
      id: 'pl-1',
      name: 'My Playlist',
      userId: 'user1',
      createdAt: '2025-06-05T10:00:00Z'
    }));
    playlistServiceSpy.getSongsInPlaylist.and.returnValue(of([]));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load playlist and its songs on init', () => {
    const mockPlaylist: Playlist = {
      id: 'pl-1',
      name: 'My Playlist',
      userId: 'user1',
      createdAt: '2025-06-05T10:00:00Z'
    };
    const rawSongs = [{ Id: 's-1', Title: 'Song A', Artist: 'Artist A', UserId: 'user2' }];
    playlistServiceSpy.getPlaylistById.and.returnValue(of(mockPlaylist));
    playlistServiceSpy.getSongsInPlaylist.and.returnValue(of(rawSongs));

    fixture.detectChanges();

    expect(component.playlist).toEqual(mockPlaylist);
    expect(component.songsInPlaylist.length).toBe(1);
  });

  it('should display error message on playlist load failure', () => {
    playlistServiceSpy.getPlaylistById.and.returnValue(throwError(() => ({ error: { message: 'Playlist no trobada' } })));
    playlistServiceSpy.getSongsInPlaylist.and.returnValue(of([]));

    
    component.ngOnInit();
    expect(component.errorMsg).toContain('No s’ha pogut carregar la playlist');
  });
});
