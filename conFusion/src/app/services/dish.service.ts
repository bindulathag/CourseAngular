import { Injectable } from '@angular/core';
import { DISHES } from "../shared/dishes";
import { Dish } from "../shared/dish";
import { Observable, delay, of, map, catchError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  // constructor() { }
  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService ) { }
  // Dependency Injection
  // getDishes(): Dish[]{
  //   return DISHES;
  // }
  // getDish(id: string): Dish{
  //   return DISHES.filter((dish) => (dish.id === id))[0];
  // }
  // getFeaturedDish(): Dish{
  //   return DISHES.filter(dish => dish.featured)[0];
  // }

  //Promises
  // getDishes(): Promise<Dish[]>{
  //   return new Promise(resolve =>{
  //     setTimeout(() =>resolve(DISHES), 2000);
  //   });
  // }
  // getDish(id: string): Promise<Dish>{
  //   return new Promise(resolve =>{
  //     setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000);
  //   });
  // }
  // getFeaturedDish(): Promise<Dish>{
  //   return new Promise(resolve => {
  //     setTimeout(() => resolve(DISHES.filter(dish => dish.featured)[0]), 2000);
  //   });
  // }

  //Observable
  // getDishes(): Observable<Dish[]>{
  //   return of(DISHES).pipe(delay(2000));
  // }
  // getDish(id: string): Observable<Dish>{
  //   return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
  // }
  // getFeaturedDish(): Observable<Dish>{
  //   return of(DISHES.filter(dish => dish.featured)[0]).pipe(delay(2000));
  // }
  // //use of params Observable
  // getDishIds(): Observable<string[] | any>{
  //   return of(DISHES.map(dish => dish.id));//constructing array of Ids from DISHES
  // }

  //Angular HttpClient
  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(baseURL + 'dishes')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDish(id: number): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDishIds(): Observable<number[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
      .pipe(catchError(error => error));
  }

  putDish(dish: Dish): Observable<Dish> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.put<Dish>(baseURL + 'dishes/' + dish.id, dish, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }
}
