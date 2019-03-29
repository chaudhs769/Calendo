import { Component } from '@angular/core';
import { DataService } from '../../services/data-service';
import { environment } from '../../../environments/environment';
import { enUS } from "../../../locales/locales";
declare var $: any;

@Component({
   selector: "calendo-settings-page",
   templateUrl: "./settings-page.component.html",
   styleUrls: [
      "./settings-page.component.scss"
   ]
})
export class SettingsPageComponent{
   locale = enUS.settingsPage;
   sortTodoByDateSelected: boolean = false;
	version: string = environment.version;
	isWindows: boolean = false;

   constructor(public dataService: DataService){
		this.locale = this.dataService.GetLocale().settingsPage;
      this.isWindows = window["Windows"] != null;
      this.dataService.HideWindowsBackButton();
   }

   async ngOnInit(){
      this.sortTodoByDateSelected = await this.dataService.GetSortTodosByDate();

      $('input').iCheck({
         checkboxClass: 'icheckbox_square-blue',
         radioClass: 'iradio_square-blue'
      });

      if(await this.dataService.GetShowOldAppointments()){
         $('#show-old-appointments-checkbox').iCheck('check');
      }
      $('#show-old-appointments-checkbox').on('ifChecked', (event) => this.onHideAppointmentsCheckboxChanged(true));
      $('#show-old-appointments-checkbox').on('ifUnchecked', (event) => this.onHideAppointmentsCheckboxChanged(false));

      // Set the correct theme radio button to checked
		let theme = await this.dataService.GetTheme();
      if(theme == environment.darkThemeKey){
			// Dark theme
			$('#dark-theme-radio-button').iCheck('check');
      }else if(theme == environment.systemThemeKey && window["Windows"]){
			// System theme
			$('#system-theme-radio-button').iCheck('check');
      }else{
			// Light theme
			$('#light-theme-radio-button').iCheck('check');
      }

      $('#light-theme-radio-button').on('ifChecked', (event) => this.changeTheme(environment.lightThemeKey));
		$('#dark-theme-radio-button').on('ifChecked', (event) => this.changeTheme(environment.darkThemeKey));
		
		if(window["Windows"]){
			$('#system-theme-radio-button').on('ifChecked', (event) => this.changeTheme(environment.systemThemeKey));
		}
   }

   onSortTodosSelectChanged(value){
      this.dataService.SetSortTodosByDate(value == 0);
   }

   onHideAppointmentsCheckboxChanged(value: boolean){
      this.dataService.SetShowOldAppointments(value);
   }

   changeTheme(theme: string){
      this.dataService.SetTheme(theme);
      this.dataService.ApplyTheme(theme);
   }
}