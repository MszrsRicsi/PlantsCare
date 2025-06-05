import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-plants',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './plants.component.html',
  styleUrl: './plants.component.scss'
})
export class PlantsComponent implements OnInit{
  constructor(private api: ApiService){}

  isEditing = false;
  isModifying = false;

  selectedPlantID: any = null;

  plants: any = [];

  ngOnInit() {
    this.getPlants();
  }

  newPlant = {
    name: "",
    species: "",
    water_interval_days: 0
  };

  getPlants(){
    this.plants = [];

    this.api.getPlants().subscribe((res: any) => {
      this.plants = res;
    });
  }

  addPlant(){
    console.log(this.newPlant);
    this.api.addPlant(this.newPlant).subscribe((res: any) => {
      alert(res.message)
      this.disableEditing();
      this.getPlants();
    });
  }

  updatePlant(){
    this.api.updatePlant(this.selectedPlantID, this.newPlant).subscribe((res: any) => {
      alert(res.message);
      this.disableModifying();
      this.getPlants();
    });
  }

  deletePlant(id: any){
    this.api.deletePlant(id).subscribe((res: any) => {
      alert(res.message)
      this.getPlants();
    });
  }

  enableModifying(id: any){
    this.disableEditing();
    this.isModifying = true;
    this.selectedPlantID = id;
  }

  disableModifying(){
    this.isModifying = false;
  }

  enableEditing(){
    this.disableModifying();
    this.isEditing = true;
  }

  disableEditing(){
    this.isEditing = false;
  }
}
