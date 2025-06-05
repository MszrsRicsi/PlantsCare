import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient){}
  serverURL = "http://localhost:3000/api";

  getPlants() {
    return this.http.get(`${this.serverURL}/plants`);
  }

  getPlantByID(id: any) {
    return this.http.get(`${this.serverURL}/plants/${id}`);
  }

  addPlant(plant: object) {
    return this.http.post(`${this.serverURL}/plants`, plant);
  }

  updatePlant(id: any, plant: object) {
    return this.http.patch(`${this.serverURL}/plants/${id}`, plant);
  }

  deletePlant(id: any) {
    return this.http.delete(`${this.serverURL}/plants/${id}`);
  }

  getWaterings(id: any) {
    return this.http.get(`${this.serverURL}/plants/${id}/waterings`);
  }

  addWatering(plant: object) {
    return this.http.post(`${this.serverURL}/waterings`, plant);
  }

  statistics() {
    return this.http.get(`${this.serverURL}/plants/stats`);
  }
}
