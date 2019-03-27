import { Component, ViewChild } from '@angular/core';
import { Todo } from '../../models/Todo';
import { DataService } from '../../services/data-service';
import { NewTodoModalComponent } from '../../components/new-todo-modal/new-todo-modal.component';
import { enUS } from '../../../locales/locales';

@Component({
   selector: "calendo-todos-page",
   templateUrl: "./todos-page.component.html",
   styleUrls: [
      "./todos-page.component.scss"
   ]
})
export class TodosPageComponent{
	locale = enUS.todosPage;
	@ViewChild(NewTodoModalComponent)
	private newTodoModalComponent: NewTodoModalComponent;

	constructor(public dataService: DataService){
		this.locale = this.dataService.GetLocale().todosPage;
		window["Windows"].UI.Core.SystemNavigationManager.getForCurrentView().appViewBackButtonVisibility = window["Windows"].UI.Core.AppViewBackButtonVisibility.collapsed;
	}

	ShowNewTodoModal(){
		this.newTodoModalComponent.Show();
	}

	CreateTodo(todo){
		this.dataService.AddTodo(todo);
	}

	DeleteTodo(todo: Todo){
		this.dataService.RemoveTodo(todo);
	}

	SortByGroupOrDate(){
		this.dataService.sortTodosByDate = !this.dataService.sortTodosByDate;
		this.dataService.LoadAllTodos();
	}
}