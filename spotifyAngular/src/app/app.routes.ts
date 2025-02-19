import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './core/guards/auth.guard';
import { SongListComponent } from './components/song-list/song-list.component';
import { SongDetailComponent } from './components/song-detail/song-detail.component';
import { SongAddComponent } from './components/song-add/song-add.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'songs', component: SongListComponent, canActivate: [AuthGuard] },
  { path: 'songs/:id', component: SongDetailComponent, canActivate: [AuthGuard] },
  { path: 'add-song', component: SongAddComponent, canActivate: [AuthGuard] },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];
