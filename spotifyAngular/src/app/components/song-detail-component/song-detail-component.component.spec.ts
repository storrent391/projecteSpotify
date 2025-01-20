import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongDetailComponentComponent } from './song-detail-component.component';

describe('SongDetailComponentComponent', () => {
  let component: SongDetailComponentComponent;
  let fixture: ComponentFixture<SongDetailComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongDetailComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongDetailComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
