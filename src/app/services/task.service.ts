import { Injectable, Type } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../Task';
import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuth } from '@okta/okta-auth-js';
import { OKTA_AUTH } from '@okta/okta-angular';


@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private apiUrl = "http://localhost:8088/todos";

  failed: Boolean = false;
  tasks: Task[] = [];

  constructor(@Inject(OKTA_AUTH) public oktaAuth: OktaAuth, private http: HttpClient) { }
  accessToken = this.oktaAuth.getAccessToken();

  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.accessToken
/*         'code_verifier':'M25iVXpKU3puUjFaYWg3T1NDTDQtcW1ROUY5YXlwalNoc0hhakxifmZHag',
        'code_challenge':'qjrzSW9gMiUgpUvqgEPE4_-8swvyCtfOVvg55o5S_es' */
      }
    )
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl, this.httpOptions);
  }

  deleteTask(task: any): Observable<Task> {
    const url = `${this.apiUrl}/${task._id}`;
    return this.http.delete<Task>(url, this.httpOptions)
  }

  updateTaskReminder(task: any): Observable<Task> {
    const url = `${this.apiUrl}/${task._id}`;
    return this.http.put<Task>(url, task, this.httpOptions)
  }

  addTask(task: Task): Observable<Task> {
    console.log(task);
    return this.http.post<Task>(this.apiUrl, task, this.httpOptions);
  }

}
