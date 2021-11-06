import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponentComponent} from './views/about-component/about-component.component';
import { AlbumComponentComponent} from './views/album-component/album-component.component';
import { ArtistDiscographyComponentComponent } from './views/artist-discography-component/artist-discography-component.component';
import { NewReleasesComponentComponent } from './views/new-releases-component/new-releases-component.component';
import { NotFoundComponentComponent } from './views/not-found-component/not-found-component.component'


const routes: Routes = [
  { path: 'album', component: AlbumComponentComponent },
  { path: 'about', component: AboutComponentComponent },
  { path: 'artist', component: ArtistDiscographyComponentComponent },
  { path: 'newReleases', component: NewReleasesComponentComponent },
  { path: '', component: NewReleasesComponentComponent},
  { path: '**', component: NotFoundComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
