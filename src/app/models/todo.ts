import { Params } from '@angular/router';

export interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export interface RouterStateModel {
    url: string;
    params: Params;
    queryParams: Params;
    data: any;
  }