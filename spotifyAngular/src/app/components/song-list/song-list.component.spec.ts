// src/app/components/song-list/song-list.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SongListComponent } from './song-list.component';
import { AuthService } from '../../services/auth.service';
import { SongService } from '../../services/song.service';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';

describe('SongListComponent', () => {
  let component: SongListComponent;
  let fixture: ComponentFixture<SongListComponent>;
  let authServiceSpy: any;
  let songServiceSpy: jasmine.SpyObj<SongService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    songServiceSpy = jasmine.createSpyObj('SongService', ['getSongs', 'searchSongs', 'deleteSong']);

    await TestBed.configureTestingModule({
      imports: [
        SongListComponent,
        CommonModule
      ],
      providers: [
        provideRouter([]),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: authServiceSpy },
        { provide: SongService, useValue: songServiceSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongListComponent);
    component = fixture.componentInstance;
  });



  it('should not show "Nova cançó" button when not logged in', () => {
    authServiceSpy.isAuthenticated.and.returnValue(false);
    songServiceSpy.getSongs.and.returnValue(of([]));
    fixture.detectChanges();

    const buttons: NodeListOf<HTMLButtonElement> = fixture.nativeElement.querySelectorAll('button');
    const newBtn = Array.from(buttons).find(btn => btn.textContent!.trim() === 'Nova cançó');
    expect(newBtn).toBeUndefined();
  });
});
