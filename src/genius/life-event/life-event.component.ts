import {Component, Input, OnInit} from '@angular/core';
import {LifeEvent} from '../../model/life-event';

export enum LifeEventTemplateVersion {
  SHORTEST = 'shortest',
  SHORT = 'short',
  FULL = 'full',
}

@Component({
  selector: 'life-event',
  templateUrl: './life-event.component.html',
  styleUrls: ['./life-event.component.scss']
})
export class LifeEventComponent implements OnInit {

  @Input() lifeEvent: LifeEvent;
  @Input() templateVersion: string;
  lifeEventTemplateVersion;

  constructor() {
    this.lifeEventTemplateVersion = LifeEventTemplateVersion;
  }

  ngOnInit(): void {
    this.templateVersion = LifeEventTemplateVersion.FULL;
  }
}
