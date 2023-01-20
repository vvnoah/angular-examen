import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Data } from '../data.service';

@Component({
  selector: 'app-container',
  template: `
        <div class="container">
          <h1>{{this.service.containers[this.container_index].name}}</h1>
          <div class="row">
              <div class="column">
                <input type="text" #name>
                <button (click)="rename_container(name.value)">Rename container</button>
              </div>
              <div class="column">
                <button (click)="add_color()">Add color</button>
                <button (click)="duplicate_container()">Duplicate container</button>
                <button (click)="remove_container()">Remove container</button>
              </div>
          </div>
          <hr>
          <app-color
            *ngFor="let color of this.service.containers[this.container_index].colors
            index as i"
            [container_index]="container_index"
            [color_index]="i"
            (mousedown)="set_origin_color(i)"
          ></app-color>
        </div>

  `,
  styles: [`

        .container {
          margin-top: 2rem;
        }
  
        .row {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        
        .column {
          display: flex;
          gap: 0.5rem;
        }

        button {
            min-height: 1.5rem;
        }

        h1 {
            margin: 0;
            line-height: 1;
            user-select: none;
        }

  `]
})
export class ContainerComponent {
  @Input() container_index!:number;
  constructor(public service:Data){}

  //=================================================================
  // Adding a color
  //=================================================================
  add_color(){
    function random_color(){
      let colors = ['red', 'blue', 'orange', 'yellow', 'green', 'purple'];
      function random_number_in_range(n:number){
        return Math.floor(Math.random() * n)
      }
      return colors[random_number_in_range(6)]
    }
    
    this.service.containers[this.container_index].colors.push(random_color());
  }
  
  //=================================================================
  // Moving a color
  //=================================================================
  set_origin_color(color_index:number){
    this.service.is_dragging = true;
    this.service.origin_color = this.service.containers[this.container_index].colors[color_index];
    this.service.origin_color_index = color_index;
    this.service.origin_container_index = this.container_index;
  }

  //=================================================================
  // Renaming a container
  //=================================================================
  rename_container(value:string){
    this.service.containers[this.container_index].name = value;
  }

  //=================================================================
  // Duplicating a container
  //=================================================================
  duplicate_container(){
    let duplicated_container = JSON.parse(JSON.stringify(this.service.containers[this.container_index]));
    duplicated_container.name = duplicated_container.name + ' - Duplicate';
    this.service.containers.push(duplicated_container);
  }

  //=================================================================
  // Removing a container
  //=================================================================
  remove_container(){
    this.service.containers.splice(this.container_index, 1);
  }
}
