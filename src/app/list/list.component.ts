import { Component, OnInit } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { TodoState, TodoStateModel } from "../state/todo.state";
import {
  GetTodos,
  DeleteTodo,
  SetSelectedTodo
} from "../state/actions/todo.actions";
import { Todo } from "../models/todo";
import { Observable } from "rxjs";
import { RouterSelectors } from "../state/router/router.selectors";
import { AuthService } from "../core/services/auth.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  @Select(TodoState.getTodoList) todos: Observable<Todo[]>;
  @Select(RouterSelectors.url) test;

  val: Observable<Todo>;

  constructor(private store: Store, private authService: AuthService) {}

  ngOnInit() {
    this.test.subscribe(x => console.log("testttt value is : ", x));

    const isListPopulated = this.store.selectSnapshot<Todo>(
      x => x.todos.todos.length
    );

    this.val = this.store.select(x => x);
    
    this.val.subscribe(x => console.log("ssssssssss: ", x));

    if (isListPopulated) {
      return;
    }
    this.store.dispatch(new GetTodos());

  }

  deleteTodo(id: number) {
    this.store.dispatch(new DeleteTodo(id));
  }

  editTodo(payload: Todo) {
    // if (this.authService.isAuthenticated) {
    //   this.store.dispatch(new SetSelectedTodo(payload));
    // }

    this.store.dispatch(new SetSelectedTodo(payload));
  }
}
