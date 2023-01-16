import { Injectable } from '@angular/core';

export interface container_interface {
    name: string,
    colors: Array<string>
}

@Injectable()
export class Data {
    containers:container_interface[] = [];
    is_dragging:boolean = false;
    origin_color!:string;
    origin_color_index!:number;
    origin_container_index!:number;
    destination_container_index!:number;
}