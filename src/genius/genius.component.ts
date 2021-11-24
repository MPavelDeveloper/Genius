import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'genius',
  templateUrl: './genius.component.html',
  styleUrls: ['./genius.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeniusComponent {
}
