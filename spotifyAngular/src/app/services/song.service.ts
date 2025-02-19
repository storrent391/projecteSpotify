import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Song {
  id: string;
  Title: string;
  Artist: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private apiUrl = 'http://localhost:5000/api/songs';

  constructor(private http: HttpClient) {}

  getSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(this.apiUrl);
  }

  getSongById(id: string): Observable<Song> {
    return this.http.get<Song>(`${this.apiUrl}/${id}`);
  }

  addSong(song: Partial<Song>, token: string): Observable<Song> {
    return this.http.post<Song>(this.apiUrl, song, this.getAuthHeaders(token));
  }
  

  updateSong(id: string, song: Partial<Song>, token: string): Observable<Song> {
    return this.http.put<Song>(`${this.apiUrl}/${id}`, song, this.getAuthHeaders(token));
  }

  deleteSong(id: string, token: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.getAuthHeaders(token));
  }

  private getAuthHeaders(token: string) {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    };
  }
}
