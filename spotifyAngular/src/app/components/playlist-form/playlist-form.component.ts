// src/app/components/playlists/playlist-form/playlist-form.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

import { PlaylistService } from '../../services/playlist.service';

@Component({
  selector: 'app-playlist-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './playlist-form.component.html',
  styleUrls: ['./playlist-form.component.css']
})
export class PlaylistFormComponent implements OnInit {
  form!: FormGroup;
  errorMsg: string = '';
  private fb = inject(FormBuilder);
  private playlistService = inject(PlaylistService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isEditMode: boolean = false;
  playlistId: string | null = null;

  ngOnInit(): void {
    // Comprovar si estem en mode edició (ruta '/playlists/:id/edit')
    this.playlistId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.playlistId;

    this.form = this.fb.group({
      name: ['', Validators.required]
    });

    if (this.isEditMode && this.playlistId) {
      // Carregar dades de la playlist per omplir el formulari
      this.playlistService.getPlaylistById(this.playlistId).subscribe({
        next: playlist => {
          if (playlist) {
            this.form.patchValue({ name: playlist.name });
          } else {
            this.router.navigate(['/playlists']);
          }
        },
        error: _ => {
          this.router.navigate(['/playlists']);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.errorMsg = 'El nom de la playlist és obligatori';
      return;
    }

    const { name } = this.form.value;

    if (this.isEditMode && this.playlistId) {
      // Actualitzar playlist existent
      this.playlistService.updatePlaylist(this.playlistId, { name }).subscribe({
        next: _ => {
          this.router.navigate(['/playlists', this.playlistId]);
        },
        error: err => {
          this.errorMsg = err.error?.message || 'Error en actualitzar la playlist';
        }
      });
    } else {
      // Crear nova playlist
      this.playlistService.addPlaylist({ name }).subscribe({
        next: newPlaylist => {
          this.router.navigate(['/playlists', newPlaylist.id]);
        },
        error: err => {
          this.errorMsg = err.error?.message || 'Error en crear la playlist';
        }
      });
    }
  }
}
