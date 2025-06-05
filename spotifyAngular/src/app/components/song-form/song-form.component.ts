// src/app/components/songs/song-form/song-form.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

import { SongService } from '../../services/song.service';

@Component({
  selector: 'app-song-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './song-form.component.html',
  styleUrls: ['./song-form.component.css']
})
export class SongFormComponent implements OnInit {
  form!: FormGroup;
  errorMsg: string = '';
  private fb = inject(FormBuilder);
  private songService = inject(SongService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  isEditMode: boolean = false;
  songId: string | null = null;

  ngOnInit(): void {
    // Comprovar si estem en mode edició (ruta '/songs/:id/edit')
    this.songId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.songId;

    this.form = this.fb.group({
      title: ['', Validators.required],
      artist: ['', Validators.required]
    });

    if (this.isEditMode && this.songId) {
      // Carregar dades de la cançó per omplir el formulari
      this.songService.getSongById(this.songId).subscribe({
        next: song => {
          if (song) {
            this.form.patchValue({
              title: song.title,
              artist: song.artist
            });
          } else {
            this.router.navigate(['/songs']);
          }
        },
        error: _ => {
          this.router.navigate(['/songs']);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const { title, artist } = this.form.value;

    if (this.isEditMode && this.songId) {
      // Actualitzar cançó existent
      this.songService.updateSong(this.songId, { title, artist }).subscribe({
        next: _ => {
          this.router.navigate(['/songs', this.songId]);
        },
        error: err => {
          this.errorMsg = err.error?.message || 'Error en actualitzar la cançó';
        }
      });
    } else {
      // Crear nova cançó
      this.songService.addSong({ title, artist }).subscribe({
        next: newSong => {
          this.router.navigate(['/songs', newSong.id]);
        },
        error: err => {
          this.errorMsg = err.error?.message || 'Error en crear la cançó';
        }
      });
    }
  }
}
