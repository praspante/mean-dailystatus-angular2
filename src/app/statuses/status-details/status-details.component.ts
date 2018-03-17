import { Component, Input } from '@angular/core';
import { Status } from '../status';
import { StatusService } from '../status.service';

@Component({
  selector: 'status-details',
  templateUrl: './status-details.component.html',
  styleUrls: ['./status-details.component.css']
})

export class StatusDetailsComponent {
  @Input()
  status: Status;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor (private statusService: StatusService) {}

  createStatus(status: Status) {
    this.statusService.createStatus(status).then((newStatus: Status) => {
      this.createHandler(newStatus);
    });
  }

  updateStatus(status: Status): void {
    this.statusService.updateStatus(status).then((updatedStatus: Status) => {
      this.updateHandler(updatedStatus);
    });
  }

  deleteStatus(statusId: String): void {
    this.statusService.deleteStatus(statusId).then((deletedStatusId: String) => {
      this.deleteHandler(deletedStatusId);
    });
  }
}

