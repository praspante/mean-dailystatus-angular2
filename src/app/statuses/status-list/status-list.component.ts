import { Component, OnInit } from '@angular/core';
import { Status } from '../status';
import { StatusService } from '../status.service';
import { StatusDetailsComponent } from '../status-details/status-details.component';

@Component({
  selector: 'status-list',
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.css'],
  providers: [StatusService]
})

export class StatusListComponent implements OnInit {

  statuses: Status[]
  selectedStatus: Status

  constructor(private statusService: StatusService) { }

  ngOnInit() {
     this.statusService
      .getStatuses()
      .then((statuses: Status[]) => {
        this.statuses = statuses.map((status) => {
	  // not sure we need this
          //if (!status.phone) {
            //status.phone = {
              //mobile: '',
              //work: ''
            //}
          //}
          return status;
        });
      });
  }

  private getIndexOfStatus = (statusId: String) => {
    return this.statuses.findIndex((status) => {
      return status._id === statusId;
    });
  }

  selectStatus(status: Status) {
    this.selectedStatus = status
  }

  createNewStatus() {
    var status: Status = {
      title: '',
      creation: new Date(Date.now()),
      last_update: new Date(Date.now()),
      text: ''
    };

    // By default, a newly-created status will have the selected state.
    this.selectStatus(status);
  }

  deleteStatus = (statusId: String) => {
    var idx = this.getIndexOfStatus(statusId);
    if (idx !== -1) {
      this.statuses.splice(idx, 1);
      this.selectStatus(null);
    }
    return this.statuses;
  }

  addStatus = (status: Status) => {
    this.statuses.push(status);
    this.selectStatus(status);
    return this.statuses;
  }

  updateStatus = (status: Status) => {
    var idx = this.getIndexOfStatus(status._id);
    if (idx !== -1) {
      this.statuses[idx] = status;
      this.selectStatus(status);
    }
    return this.statuses;
  }
}

