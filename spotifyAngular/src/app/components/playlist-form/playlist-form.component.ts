// src/app/components/playlists/playlist-form/playlist-form.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

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
  isEditMode: boolean = false;
  playlistId?: string;
  errorMsg: string = '';
  private fb = inject(FormBuilder);
  private playlistService = inject(PlaylistService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });

    this.playlistId = this.route.snapshot.paramMap.get('id')!;
    if (this.playlistId) {
      this.isEditMode = true;
      this.playlistService.getPlaylistById(this.playlistId).subscribe({
        next: pl => {
          this.form.patchValue({ name: pl.name });
        },
        error: err => console.error('Error carregant playlist per editar:', err)
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const { name } = this.form.value;
    if (this.isEditMode && this.playlistId) {
      this.playlistService.updatePlaylist(this.playlistId, name).subscribe({
        next: () => this.router.navigate(['/playlists', this.playlistId]),
        error: err => {
          this.errorMsg = 'Error en actualitzar la playlist';
          console.error(err);
        }
      });
    } else {
      this.playlistService.createPlaylist(name).subscribe({
        next: pl => this.router.navigate(['/playlists', pl.id]),
        error: err => {
          this.errorMsg = 'Error en crear la playlist';
          console.error(err);
        }
      });
    }
  }
}
