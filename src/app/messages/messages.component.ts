/*!
 * Copyright (c) 2018, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuth } from '@okta/okta-auth-js';
import { HttpClient } from '@angular/common/http';

import sampleConfig from '../app.config';
import { OKTA_AUTH } from '@okta/okta-angular';

interface Message {
  date: string;
  text: string;
  index: number;
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  failed: Boolean = false;
  messages: Message[] = [];

  constructor(@Inject(OKTA_AUTH) public oktaAuth: OktaAuth, private http: HttpClient) {
    this.messages = [];
  }

  async ngOnInit() {
    console.log("messages...");
    const accessToken = this.oktaAuth.getAccessToken();
    console.log(accessToken);
    this.http.get(sampleConfig.resourceServer.messagesUrl, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      }
    }).subscribe((data: any) => {
      console.log("retuned...." + data)
      let index = 1;
      const messages = data.messages.map((message: Message) => {
        console.log("messages:  " + message)
        const date = new Date(message.date);
        const day = date.toLocaleDateString();
        const time = date.toLocaleTimeString();
        return {
          date: `${day} ${time}`,
          text: message.text,
          index: index++
        };
      });
      [].push.apply(this.messages, messages);
    }, (err) => {
      console.error(err);
      this.failed = true;
    }); 
  } 
}
