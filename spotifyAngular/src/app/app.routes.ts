import { Routes } from '@angular/router';

// Importa tus componentes desde la carpeta '/components/'
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
// import { ProfileComponent } from './components/profile/profile.component';
// import { ExploreComponent } from './components/explore/explore.component';
import { SongDetailComponent } from './components/song-detail/song-detail.component';
// import { PlaylistsComponent } from './components/playlists/playlists.component';
// import { CreatePlaylistComponent } from './components/create-playlist/create-playlist.component';
// import { MusicPlayerComponent } from './components/music-player/music-player.component';
// import { SearchComponent } from './components/search/search.component';
// import { SettingsComponent } from './components/settings/settings.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

// Definición de las rutas
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },  // Redirige a la página 404 si la ruta no es encontrada
];
