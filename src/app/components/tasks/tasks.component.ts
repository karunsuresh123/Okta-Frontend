import { Component, Inject, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../Task';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { ConditionalExpr } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  failed: Boolean = false;
  tasks: Task[] = [];
  private apiUrl = "http://localhost:8088/todos";
  constructor(private http: HttpClient,
    private taskService: TaskService,
    public authStateService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((data: any) => {
      data.forEach((element: any) => {
        var taskElement: Task = {
          _id: '',
          text: '',
          daytime: '',
          reminder: false
        };
        taskElement._id = element._id;
        taskElement.text = element.text;
        taskElement.daytime = element.daytime;
        taskElement.reminder = element.reminder;
        this.tasks.push(taskElement);
      });
      console.log("TASKS list :", this.tasks);
    }, (err) => {
      this.failed = true;
    });
  }

  deleteTask(task: Task) {
    console.log("TASK: ",task)
    this.taskService.deleteTask(task).subscribe(
      () => (this.tasks = this.tasks.filter(t => t._id !== task._id)));
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe()
  }

  addTask(task: Task) {
    console.log("adding task...:  ",task)
    this.taskService.addTask(task).subscribe((task) => {
      this.tasks.push(task)
    }
    );
  }

}
