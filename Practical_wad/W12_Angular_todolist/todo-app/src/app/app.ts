import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // ✅ ADD THIS

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule], // ✅ ADD HERE
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
   // Variables
   taskInput : string = '';
   tasks : any[]=[];
   editIndex : number | null = null;

   //add task method
   addTask(){
      if(this.taskInput.trim()!==''){
        this.tasks.push({ name : this.taskInput});
        this.taskInput = '';
      }
   }

   //delete
   deleteTask(index : number){
        this.tasks.splice(index,1);
   }
  //edit
  editTask(index:number){
    this.taskInput = this.tasks[index].name; // show task in input
    this.editIndex = index;
  }
  //update task
  updateTask(){
      if (this.editIndex !== null) {  // check if editing
      this.tasks[this.editIndex].name = this.taskInput; // replace value
      this.taskInput = '';          // clear input
      this.editIndex = null;        // exit edit mode
    }
  }
}
