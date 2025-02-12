import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Song } from '../models/song.model';

@Injectable({
  providedIn: 'root',
})
export class SongService {
  private baseUrl = 'http://localhost:5000/songs';

  constructor(private http: HttpClient) {}

  getSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.baseUrl}`);
  }

  rateSong(songId: number, rating: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/${songId}/rate`, { rating });
  }
}
