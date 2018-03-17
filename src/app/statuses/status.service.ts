import { Injectable } from '@angular/core';
import { Status } from './status';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class StatusService {
    private statusesUrl = '/api/statuses';

    constructor (private http: Http) {}

    // get("/api/contacts")
    getStatuses(): Promise<void | Contact[]> {
      return this.http.get(this.statusesUrl)
                 .toPromise()
                 .then(response => response.json() as Status[])
                 .catch(this.handleError);
    }

    // post("/api/statuses")
    createStatus(newStatus: Status): Promise<void | Status> {
      return this.http.post(this.statusesUrl, newStatus)
                 .toPromise()
                 .then(response => response.json() as Status)
                 .catch(this.handleError);
    }

    // get("/api/statuses/:id") endpoint not used by Angular app

    // delete("/api/statuses/:id")
    deleteStatus(delStatusId: String): Promise<void | String> {
      return this.http.delete(this.statusessUrl + '/' + delStatusId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/api/statuses/:id")
    updateStatus(putStatus: Status): Promise<void | Status> {
      var putUrl = this.statusesUrl + '/' + putStatus._id;
      return this.http.put(putUrl, putStatus)
                 .toPromise()
                 .then(response => response.json() as Status)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}

