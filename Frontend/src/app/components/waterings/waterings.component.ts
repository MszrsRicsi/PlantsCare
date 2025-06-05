import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-waterings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './waterings.component.html',
  styleUrl: './waterings.component.scss'
})
export class WateringsComponent implements OnInit {
  constructor(private api: ApiService){}

  selectedPlantID: number = -1;

  plants: any = [];
  waterings: any = [];

  isWatering = false;

  plant: any = {
    plant_id: "",
    date_watered: "",
    amount_ml: "",
    notes: ""
  }

  ngOnInit() {
    this.api.getPlants().subscribe((res: any) => {
      this.plants = res;
    });

    this.getWateringData();
  }

  getWateringData() {
    this.waterings = [];
    this.selectedPlantID = (document.getElementById("plantSelect") as any).value;

    if (this.selectedPlantID >= 0)
    {
      this.enableWateringForm();
    }
    else{
      this.disableWateringForm();
    }
    
    this.api.getWaterings(this.selectedPlantID).subscribe((res: any) => {
      this.waterings = res;
    });
  }

  enableWateringForm(){
    this.isWatering = true;
  }

  disableWateringForm(){
    this.isWatering = false;
  }

  addWatering()
  {
    this.plant.plant_id = this.selectedPlantID;
    this.api.addWatering(this.plant).subscribe((res: any) => {
      alert(res.message);
    });
  }
}
