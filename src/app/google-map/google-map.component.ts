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
    lat: 17.7384734,
    lng: 82.9823971
  };
  markerId: string;

  constructor() {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.createMap();
  }

  async createMap() {
    try {
      this.newMap = await GoogleMap.create({
        id: 'capacitor-google-maps',
        element: this.mapRef.nativeElement,
        apiKey: environment.google_maps_api_key,
        config: {
          center: this.center,
          zoom: 5,
        },
      });

      // Move the map programmatically
      await this.newMap.setCamera({
        coordinate: {
          lat: this.center.lat,
          lng: this.center.lng,
          // lat: 28.782991, 
          // lng: 76.945626,
        },
        animate: true
      });

        // Enable marker clustering
      // await this.newMap.enableClustering();

        // Enable traffic Layer
        
        // for traffic
      // await this.newMap.enableTrafficLayer(true);

      // for current loocation with out pointer
      // await this.newMap.enableCurrentLocation(true);

      // await this.newMap.setPadding({
      //   top: 50,
      //   left: 50,
      //   right: 0,
      //   bottom: 0,
      // });

      // await this.newMap.setMapType(MapType.Satellite);
  
      this.addMarkers(this.center.lat, this.center.lng);
      this.addListeners();
    } catch(e) {
      console.log(e);
    }
  }

  async addMarkers(lat, lng) {
    // Add a marker to the map
    // if(this.markerId) this.removeMarker();
    await this.newMap.addMarkers([
      {
        coordinate: {
          lat: lat,
          lng: lng,
        },
        // title: ,
        draggable: true
      },
      {
        coordinate: {
          lat: 17.7384734, 
          lng: 82.9823971,
        },
        // title: ,
        draggable: true
      },
      {
        coordinate: {
          lat: 17.4385638,
          lng: 78.0229312,
        },
        // title: ,
        draggable: true
      },
      {
        coordinate: {
          lat: 17.447773,
          lng: 78.3585804
        },
        // title: ,
        draggable: true
      },
      {
        coordinate: {
          lat: 12.9542946,
          lng: 77.4908547
        },
        // title: ,
        draggable: true
      },
    ]);
  }
  
  async addMarker(lat, lng) {
    // Add a marker to the map
    // if(this.markerId) this.removeMarker();
    this.markerId = await this.newMap.addMarker({
      coordinate: {
        lat: lat,
        lng: lng,
      },
      // title: ,
      draggable: true
    });
  }

  async removeMarker(id?) {
    await this.newMap.removeMarker(id ? id : this.markerId);
  }

  async addListeners() {
    // Handle marker click
    await this.newMap.setOnMarkerClickListener((event) => {
      console.log('setOnMarkerClickListener', event);
      this.removeMarker(event.markerId);
    });

    // await this.newMap.setOnCameraMoveStartedListener((event) => {
    //   console.log(event);
    // });

    await this.newMap.setOnMapClickListener((event) => {
      console.log('setOnMapClickListener', event);
      this.addMarker(event.latitude, event.longitude);
    });

    await this.newMap.setOnMyLocationButtonClickListener((event) => {
      console.log('setOnMyLocationButtonClickListener', event);
      // this.addMarker(event.latitude, event.longitude);
    });

    await this.newMap.setOnMyLocationClickListener((event) => {
      console.log('setOnMyLocationClickListener', event);
      this.addMarker(event.latitude, event.longitude);
    });
  }

}
