import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SongService, Song } from '../../services/song.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-song-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.css']
})
export class SongDetailComponent implements OnInit {
  song: Song | null = null;

  constructor(private route: ActivatedRoute, private songService: SongService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.songService.getSongById(id).subscribe({
        next: (data) => (this.song = data),
        error: (err) => console.error('Error obtenint la cançó', err)
      });
    }
  }
}
