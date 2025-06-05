
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PlaylistService } from '../../services/playlist.service';
import { AuthService } from '../../services/auth.service';
import { Playlist } from '../../models/playlist.model';

@Component({
  selector: 'app-playlist-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.css']
})
export class PlaylistListComponent implements OnInit {
  playlists: Playlist[] = [];
  errorMsg: string = '';

  private playlistService = inject(PlaylistService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.loadPlaylists();
  }

  loadPlaylists(): void {
    this.playlistService.getPlaylists().subscribe({
      next: data => {
        this.playlists = data;
      },
      error: err => {
        console.error('Error al carregar playlists:', err);
        this.errorMsg = 'No s’han pogut carregar les playlists';
      }
    });
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('jwtToken');
  }

  isOwner(playlist: Playlist): boolean {
    const currentUser = this.authService.currentUser;
    return currentUser ? currentUser.id === playlist.userId : false;
  }

  deletePlaylist(playlistId: string): void {
    if (!confirm('Segur que vols eliminar aquesta playlist?')) return;

    this.playlistService.deletePlaylist(playlistId).subscribe({
      next: () => {
        this.loadPlaylists();
      },
      error: err => {
        console.error('Error en esborrar la playlist:', err);
        this.errorMsg = 'No s’ha pogut eliminar la playlist';
      }
    });
  }
}
