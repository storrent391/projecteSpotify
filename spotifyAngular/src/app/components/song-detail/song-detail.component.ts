// src/app/components/songs/song-detail/song-detail.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

import { SongService } from '../../services/song.service';
import { Song } from '../../models/song.model';

@Component({
  selector: 'app-song-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.css']
})
export class SongDetailComponent implements OnInit {
  song?: Song;
  errorMsg: string = '';

  private songService = inject(SongService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.songService.getSongById(id).subscribe({
      next: data => this.song = data,
      error: err => {
        this.errorMsg = 'No s’ha pogut carregar la cançó';
        console.error(err);
      }
    });
  }

  deleteSong(): void {
    if (!this.song) return;
    if (confirm('Segur que vols eliminar aquesta cançó?')) {
      this.songService.deleteSong(this.song.id).subscribe({
        next: () => this.router.navigate(['/songs']),
        error: err => console.error('Error en esborrar la cançó:', err)
      });
    }
  }
}
