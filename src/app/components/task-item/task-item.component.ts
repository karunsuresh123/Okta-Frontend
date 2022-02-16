import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Task } from '../../Task';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input() taskItem: Task | undefined;
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onToggleReminder: EventEmitter<Task> = new EventEmitter();

  faTimes = faTimes;

  constructor() { }

  ngOnInit(): void {
    console.log("daytime is;  ",this.taskItem);
  }

  onDelete(task: Task | undefined) {
    this.onDeleteTask.emit(task);
  }

  onToggle(task: Task | undefined) {
    console.log("TASKKKKK: ",task)
    this.onToggleReminder.emit(task);
  }

}
