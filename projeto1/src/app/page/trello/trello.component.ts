import { Component, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { TrelloService } from '../../services/trello.service';
import { Column } from '../../interfaces/column';
import { Card } from '../../interfaces/card';

@Component({
  selector: 'app-trello',
  standalone: false,
  providers: [TrelloService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './trello.component.html',
  styleUrls: ['./trello.component.css']
})
export class TrelloComponent {

  public columnList: Column[] = [];

  constructor(public trelloService: TrelloService, private cdr: ChangeDetectorRef) { }


  ngOnInit() {
    this.columnList = this.trelloService.columnList();
  }

  public createColumn() {
    this.trelloService.createColumn('Digite o título aqui');
    this.columnList = [...this.trelloService.columnList()];
    this.cdr.detectChanges();
  }

  public deleteColumn(columnId: number) {
    this.trelloService.deleteColumn(columnId);
    this.columnList = [...this.trelloService.columnList()];
    this.cdr.markForCheck();
  }

  public updateColumnList() {
    this.columnList = [...this.trelloService.columnList()];
    this.cdr.markForCheck();
  }
}
