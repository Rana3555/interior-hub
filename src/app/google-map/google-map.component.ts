import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit {

  @ViewChild('map') mapRef: ElementRef<HTMLElement>; 
  newMap: GoogleMap;
  center: any = {
    lat: 17.7138476,
    lng: 83.315665,
  };

  markerId: string;

  constructor() { }

  ngOnInit() {
    this.createMap ();
  }

  ngAfterViewInit() {
    this.createMap();
  }

 async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'capacitor-google-maps',
      element: this.mapRef.nativeElement,
      apiKey: environment.google_maps_api_key,
      config: {
        center: this.center,
        zoom: 8,
      },
    });
    this.addMarker(this.center.lat, this.center.lng);
  }
//  marker location
  async addMarker (lat,lng) {
    this.markerId = await this.newMap.addMarker({
      coordinate: {
        lat: lat,
        lng: lng,
      },
        draggable: true
    });
  }
// remover mark
  async removeMarker() {
    await this.newMap.removeMarker(this.markerId);
  }

  // handle mmarker click
  async addListeners(){
    await this.newMap.setOnInfoWindowClickListener((event) =>{
      console.log(event);
    });
    
    // await this.newMap.setOnCameraMoveStartedListener((event) =>{
    //   console.log(event);
    // });
    

  }


}
