import { Component, OnInit } from '@angular/core';
import data from '../data/NewReleasesAlbum.json'

@Component({
  selector: 'app-new-releases-component',
  templateUrl: './new-releases-component.component.html',
  styleUrls: ['./new-releases-component.component.css']
})
export class NewReleasesComponentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  releases = data.albums.items;

  

}
