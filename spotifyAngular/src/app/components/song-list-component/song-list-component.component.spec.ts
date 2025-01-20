import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongListComponentComponent } from './song-list-component.component';

describe('SongListComponentComponent', () => {
  let component: SongListComponentComponent;
  let fixture: ComponentFixture<SongListComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongListComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
