// src/app/components/songs/song-form/song-form.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

import { SongService } from '../../services/song.service';

@Component({
  selector: 'app-song-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './song-form-component.component.html',
  styleUrls: ['./song-form-component.component.css']
})
export class SongFormComponent implements OnInit {
  form!: FormGroup;
  isEditMode: boolean = false;
  songId?: string;
  errorMsg: string = '';
  private fb = inject(FormBuilder);
  private songService = inject(SongService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      artist: ['', Validators.required]
    });

    this.songId = this.route.snapshot.paramMap.get('id')!;
    if (this.songId) {
      this.isEditMode = true;
      this.songService.getSongById(this.songId).subscribe({
        next: song => {
          this.form.patchValue({
            title: song.title,
            artist: song.artist
          });
        },
        error: err => console.error('Error carregant la cançó per editar:', err)
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const { title, artist } = this.form.value;
    if (this.isEditMode && this.songId) {
      this.songService.updateSong(this.songId, { title, artist }).subscribe({
        next: () => this.router.navigate(['/songs', this.songId]),
        error: err => {
          this.errorMsg = 'Error en actualitzar la cançó';
          console.error(err);
        }
      });
    } else {
      this.songService.createSong(title, artist).subscribe({
        next: song => this.router.navigate(['/songs', song.id]),
        error: err => {
          this.errorMsg = 'Error en crear la cançó';
          console.error(err);
        }
      });
    }
  }
}
