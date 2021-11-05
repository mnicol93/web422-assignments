import { Component, OnInit } from '@angular/core';
import albumData from '../data/SearchResultsAlbum.json';
import artistData from '../data/SearchResultsArtist.json';
@Component({
  selector: 'app-artist-discography-component',
  templateUrl: './artist-discography-component.component.html',
  styleUrls: ['./artist-discography-component.component.css']
})
export class ArtistDiscographyComponentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // this.albums = albumData.items.filter(
    //   (curValue, index, self) => self.findIndex(
    //     t => t.name.toUpperCase() === curValue.name.toUpperCase() === index
    //     ));
  }

  albums = albumData;
  artist = artistData;
}
