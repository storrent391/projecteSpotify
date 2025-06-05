
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Playlist } from '../models/playlist.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/playlists`;

  /**
   * Mappeja l’objecte crud del backend ({ Id, Name, UserId, CreatedAt })
   * a l’objecte Playlist amb camps en minúscules.
   */
  private mapRawToPlaylist(raw: any): Playlist {
    return {
      id: raw.Id,
      name: raw.Name,
      userId: raw.UserId,
      createdAt: raw.CreatedAt
    };
  }

  getPlaylists(): Observable<Playlist[]> {
    return this.http
      .get<any[]>(this.apiUrl)
      .pipe(map(rawList => rawList.map(raw => this.mapRawToPlaylist(raw))));
  }

  getPlaylistById(id: string): Observable<Playlist> {
    return this.http
      .get<any>(`${this.apiUrl}/${id}`)
      .pipe(map(raw => this.mapRawToPlaylist(raw)));
  }

  addPlaylist(data: { name: string }): Observable<Playlist> {
    return this.http
      .post<any>(this.apiUrl, data)
      .pipe(map(raw => this.mapRawToPlaylist(raw)));
  }

  updatePlaylist(id: string, data: { name: string }): Observable<Playlist> {
    return this.http
      .put<any>(`${this.apiUrl}/${id}`, data)
      .pipe(map(raw => this.mapRawToPlaylist(raw)));
  }

  deletePlaylist(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getSongsInPlaylist(playlistId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${playlistId}/songs`);
  }

  addSongToPlaylist(playlistId: string, songId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${playlistId}/songs`, { songId });
  }

  removeSongFromPlaylist(playlistId: string, songId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${playlistId}/songs/${songId}`);
  }
}
