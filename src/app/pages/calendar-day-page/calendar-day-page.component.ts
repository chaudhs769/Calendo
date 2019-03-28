import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { DataService } from '../../services/data-service';
import { AppointmentModalComponent } from '../../components/appointment-modal/appointment-modal.component';
import { NewTodoModalComponent } from '../../components/new-todo-modal/new-todo-modal.component';
import { Appointment } from '../../models/Appointment';
import { Todo } from '../../models/Todo';
import { enUS } from '../../../locales/locales';

@Component({
   selector: "calendo-calendar-day-page",
   templateUrl: "./calendar-day-page.component.html"
})
export class CalendarDayPageComponent{
   locale = enUS.calendarDayPage;
   @ViewChild(AppointmentModalComponent)
   private newAppointmentModalComponent: AppointmentModalComponent;
   @ViewChild(NewTodoModalComponent)
   private newTodoModalComponent: NewTodoModalComponent;
   date: moment.Moment = moment();

   constructor(public dataService: DataService,
               private route: ActivatedRoute){
      this.locale = this.dataService.GetLocale().calendarDayPage;
      moment.locale(this.dataService.locale);
      this.dataService.HideWindowsBackButton();
   }

   ngOnInit(){
      this.route.params.subscribe(param => {
         if(param.time){
            this.date = moment.unix(param.time);
            this.dataService.selectedDay = this.date;
            
            this.dataService.LoadAllAppointments();
            this.dataService.LoadAllTodos();
         }
      });
   }

   getCurrentDate(){
      return this.date.format(this.locale.formats.currentDay);
   }

   showNewTodoModal(){
      this.newTodoModalComponent.Show(this.date.unix());
   }

   showNewAppointmentModal(){
      this.newAppointmentModalComponent.Show(null, this.date.unix());
   }

   CreateAppointment(appointment: Appointment){
      this.dataService.AddAppointment(appointment);
   }

   CreateTodo(todo: Todo){
      this.dataService.AddTodo(todo);
   }

   DeleteTodo(todo: Todo){
      this.dataService.RemoveTodo(todo);
   }
}