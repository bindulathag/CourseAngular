import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { DishService } from '../services/dish.service';
import { Dish } from "../shared/dish";

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

   //@Input()
   dishDetails: Dish;
   
   constructor(private dishService: DishService,
                private route: ActivatedRoute,
                private location: Location) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.dishDetails = this.dishService.getDish(id);
  }

  goBack(): void{
    this.location.back();
  }
 
}