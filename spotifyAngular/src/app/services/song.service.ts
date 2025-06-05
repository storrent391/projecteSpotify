// **2. Ajusta `SongService` perquè mapegi les propietats retornades pel backend (que arriben com a `Id`, `Title`, `Artist`, `UserId`) a les propietats en minúscules (id, title, artist, userId).**
// spotifyAngular/src/app/services/song.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Song } from '../models/song.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/songs`;

  /** 
   * Mappeja un objecte cru ({"Id": "...", "Title": "...", ...}) a l’objecte Song correcte.
   */
  private mapRawToSong(raw: any): Song {
    return {
      id: raw.Id,
      title: raw.Title,
      artist: raw.Artist,
      userId: raw.UserId
    };
  }

  getSongs(page: number, limit: number): Observable<Song[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}?page=${page}&limit=${limit}`)
      .pipe(map(rawList => rawList.map(raw => this.mapRawToSong(raw))));
  }

  searchSongs(title?: string, artist?: string): Observable<Song[]> {
    let queryParams = '';
    if (title) queryParams += `title=${encodeURIComponent(title)}&`;
    if (artist) queryParams += `artist=${encodeURIComponent(artist)}&`;
    if (queryParams.endsWith('&')) queryParams = queryParams.slice(0, -1);

    return this.http
      .get<any[]>(`${this.apiUrl}/search?${queryParams}`)
      .pipe(map(rawList => rawList.map(raw => this.mapRawToSong(raw))));
  }

  getSongById(id: string): Observable<Song> {
    return this.http
      .get<any>(`${this.apiUrl}/${id}`)
      .pipe(map(raw => this.mapRawToSong(raw)));
  }

  addSong(data: { title: string; artist: string }): Observable<Song> {
    return this.http
      .post<any>(this.apiUrl, data)
      .pipe(map(raw => this.mapRawToSong(raw)));
  }

  updateSong(id: string, data: { title?: string; artist?: string }): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, data);
  }

  deleteSong(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
