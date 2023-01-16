import { Component} from '@angular/core';
import { Data } from '../data.service';

@Component({
  selector: 'app-container-list',
  template: `

    <div class="row">
      <div>
        <label for="container-name">Container name: </label>
        <input id="container-name" type="text" #name>
      </div>
      <button (click)="add_container(name.value)">Container toevoegen</button>
    </div>
    <app-container 
      *ngFor="let container of this.service.containers;
      index as i"
      [container_index]="i"
      (mouseup)="move_color(i)">
    </app-container>

  `,
  styles: [`
    .row {
      display: flex;
      gap: 1rem
    }
  `]
})
export class ContainerListComponent {
  constructor(public service:Data){}

  //=================================================================
  // Adding a container
  //=================================================================
  add_container(name:string) {
    this.service.containers.push({name: name, colors: []})
  }
  
  //=================================================================
  // Moving a color
  //=================================================================
  set_destination_container_index(index:number){
    this.service.destination_container_index = index;
    console.log('destination container index: ', this.service.destination_container_index);
  }

  move_color(index:number){
    if(this.service.is_dragging == true){
      this.set_destination_container_index(index);
      // Remove from origin
      this.service.containers[this.service.origin_container_index].colors.splice(this.service.origin_color_index, 1);
      // Add to destination
      this.service.containers[this.service.destination_container_index].colors.push(this.service.origin_color);
      
      this.service.is_dragging = false;
    }
  }
}
