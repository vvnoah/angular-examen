import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Data } from '../data.service';

@Component({
  selector: 'app-color',
  template: `
    <div [style.background-color]="this.service.containers[this.container_index].colors[this.color_index]">
      <p>
        {{this.service.containers[this.container_index].colors[this.color_index]}}
      </p>
      <button (click)="remove_color()">Remove</button>
    </div>
  `,
  styles: [`

    div {
      display: flex;
      justify-content: space-between;
      padding-inline: 1rem;
      align-items: center;
      user-select: none;
    }

    button {
      height: 1.5em;
    }

  `]
})
export class ColorComponent {
  @Input() container_index!:number;
  @Input() color_index!:number;
  constructor(public service:Data){}

  //===============================================
  // Remove a color
  //===============================================
  remove_color(){
    this.service.containers[this.container_index].colors.splice(this.color_index, 1);
  }
}
