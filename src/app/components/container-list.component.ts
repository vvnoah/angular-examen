import { Component} from '@angular/core';
import { Data } from '../data.service';

@Component({
  selector: 'app-container-list',
  template: `

    <div class="row">
      <div class="column">
        <label for="container-name">Container name: </label>
        <input id="container-name" type="text" #name>
        <button (click)="add_container(name.value)">Container toevoegen</button>
      </div>
    </div>
    
    <div class="grid">
      <app-container 
        class="container"
        *ngFor="let container of this.service.containers;
        index as i"
        [container_index]="i"
        (mouseup)="move_color(i)">
      </app-container>
    </div>

  `,
  styles: [`
    .row {
      display: flex;
      flex-wrap: wrap;
    }
    
    .column {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    @media (min-width: 1000px){
      .grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
      }
      
      .container {
        flex-basis: 600px;
      }
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
