import { Todo } from "../models/todo";
import { TodoService } from "../core/services/todo.service";
import { State, Action, StateContext, Selector, actionMatcher } from "@ngxs/store";
import { GetTodos, DeleteTodo, SetSelectedTodo, UpdateTodo, AddTodo } from './actions/todo.actions';

import {tap} from 'rxjs/operators';

export class TodoStateModel {
  todos: Todo[];
  selectedTodo: Todo;
}

@State<TodoStateModel>({
  name: "todos",
  defaults: {
    todos: [],
    selectedTodo: null
  }
})
export class TodoState {
  constructor(private todoService: TodoService) {}

    @Selector()
    static getTodoList(state: TodoStateModel){
        return state.todos;
    }

    @Selector()
    static getSelectedTodo(state: TodoStateModel){
        return state.selectedTodo;
    }

    @Action(GetTodos)
    // getTodos(ctx: StateContext<TodoStateModel>, action: GetTodos){
        
    //     return this.todoService.fetchTodos().pipe(
    //         tap( getTodos => {
                
    //             const state = ctx.getState();
    //             console.log("inside GetTodos method: ", state)
    //             ctx.setState({
    //                 ...state,
    //                 todos: getTodos,
    //             });
    //         })
    //     )
    // }

    getTodos({getState, setState}: StateContext<TodoStateModel>) {
        return this.todoService.fetchTodos().pipe(tap((result) => {
            const state = getState();

            console.log("inside GetTodos method: ", state, result)

            setState({
                ...state,
                todos: result,
            });
        }));
    }

    @Action(AddTodo)
    addTodo({getState, patchState}: StateContext<TodoStateModel>, {payload}: AddTodo) {
        return this.todoService.addTodo(payload).pipe(tap((result) => {
            const state = getState();
            patchState({
                todos: [...state.todos, result]
            });
        }));
    }

    @Action(UpdateTodo)
    updateTodo({getState, setState}: StateContext<TodoStateModel>, {payload}: UpdateTodo){
        return this.todoService.updateTodo(payload, payload.id).pipe(tap((result) => {
            console.log("RESULT IS : ", result);
            const state = getState();
            const todoList = [...state.todos];
            const todoIndex = todoList.findIndex(item => item.id === payload.id);
            todoList[todoIndex] = result;
            setState({
                ...state,
                todos: todoList,
            });
        }));
    }
     @Action(DeleteTodo)
     deleteTodo({getState, setState}: StateContext<TodoStateModel>, {id}: DeleteTodo) {

        return this.todoService.deleteTodo(id).pipe(tap((result) => {
            const state = getState();
            const filteredArray = state.todos.filter(item => item.id !== id);

            setState({
                ...state,
                todos: filteredArray,
            });
        }));
    }

    @Action(SetSelectedTodo)
    setSelectedTodo({getState, setState}: StateContext<TodoStateModel>, {payload}: SetSelectedTodo){
        const state = getState();
        setState({
            ...state,
            selectedTodo: payload
        });
    }
    
        

}
