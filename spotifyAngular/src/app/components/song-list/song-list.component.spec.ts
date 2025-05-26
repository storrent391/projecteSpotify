// src/app/components/song-list/song-list.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SongListComponent } from './song-list.component';
import { SongService } from '../../services/song.service';
import { of } from 'rxjs';
import { Song } from '../../models/song.model';
import { By } from '@angular/platform-browser';

describe('SongListComponent (TDD)', () => {
  let component: SongListComponent;
  let fixture: ComponentFixture<SongListComponent>;
  let mockService: Partial<SongService>;

  const mockSongs: Song[] = [
    { id: "1", title: 'Imagine', artist: 'John Lennon', createdAt: "05/07/1980", idCreador: "123456" },
    { id: "2", title: 'Hey Jude', artist: 'The Beatles', createdAt: "05/07/1980", idCreador: "12345645" }
  ];

  beforeEach(async () => {
    // Creamos un stub que implementa sólo el método list()
    mockService = {
      list: () => of(mockSongs)
    };

    await TestBed.configureTestingModule({
      declarations: [SongListComponent],
      providers: [
        { provide: SongService, useValue: mockService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SongListComponent);
    component = fixture.componentInstance;
  });

  it('should fetch songs on init and render them', () => {
    // Dispara ngOnInit() y la suscripción a list()
    fixture.detectChanges();

    const items = fixture.debugElement.queryAll(By.css('.song-item'));
    expect(items.length).toBe(2);
    expect(items[0].nativeElement.textContent).toContain('Imagine');
    expect(items[1].nativeElement.textContent).toContain('Hey Jude');
  });
});
