// src/app/components/playlists/playlist-detail/playlist-detail.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { PlaylistService } from '../../services/playlist.service';
import { SongService } from '../../services/song.service';
import { Playlist } from '../../models/playlist.model';
import { Song } from '../../models/song.model';

@Component({
  selector: 'app-playlist-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.css']
})
export class PlaylistDetailComponent implements OnInit {
  playlist?: Playlist;
  songs: Song[] = [];
  newSongId: string = '';
  errorMsg: string = '';
  isOwner: boolean = false;

  private playlistService = inject(PlaylistService);
  private songService = inject(SongService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.playlistService.getPlaylistById(id).subscribe({
      next: pl => {
        this.playlist = pl;
        const currentUserId = JSON.parse(localStorage.getItem('currentUser') || 'null')?.id;
        this.isOwner = currentUserId === pl.userId;
        this.loadSongs();
      },
      error: err => {
        this.errorMsg = 'No s’ha pogut carregar la playlist';
        console.error(err);
      }
    });
  }

  loadSongs(): void {
    if (!this.playlist) return;
    this.playlistService.getSongsInPlaylist(this.playlist.id).subscribe({
      next: data => this.songs = data,
      error: err => console.error('Error carregant cançons de la playlist:', err)
    });
  }

  addSong(): void {
    if (!this.playlist || !this.newSongId) return;
    this.playlistService.addSongToPlaylist(this.playlist.id, this.newSongId).subscribe({
      next: () => {
        this.newSongId = '';
        this.loadSongs();
      },
      error: err => console.error('Error afegint cançó a la playlist:', err)
    });
  }

  removeSong(songId: string): void {
    if (!this.playlist) return;
    this.playlistService.removeSongFromPlaylist(this.playlist.id, songId).subscribe({
      next: () => this.loadSongs(),
      error: err => console.error('Error eliminant cançó de la playlist:', err)
    });
  }

  deletePlaylist(): void {
    if (!this.playlist) return;
    if (confirm('Segur que vols eliminar aquesta playlist?')) {
      this.playlistService.deletePlaylist(this.playlist.id).subscribe({
        next: () => this.router.navigate(['/playlists']),
        error: err => console.error('Error en esborrar la playlist:', err)
      });
    }
  }
}
