
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { TodoState, TodoStateModel } from '../state/todo.state';
import { GetTodos, DeleteTodo, SetSelectedTodo } from '../state/actions/todo.actions';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Select(TodoState.getTodoList) todos : Observable<Todo[]>

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new GetTodos());
  }

  deleteTodo(id: number){
    this.store.dispatch(new DeleteTodo(id));
  }

  editTodo(payload: Todo){
    this.store.dispatch(new SetSelectedTodo(payload));
  }

  

}
