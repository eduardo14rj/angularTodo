import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Column } from '../../interfaces/column';
import { TrelloService } from '../../services/trello.service';
import { Card } from '../../interfaces/card';

@Component({
  selector: 'app-column',
  standalone: false,
  templateUrl: './column.component.html',
  styleUrl: './column.component.css'
})
export class ColumnComponent {
  @Input() column!: Column;
  @Input() deletedoColumn!: (columnId: number) => void
  @Input() updateColumnList!: () => void;

  public createCardTitle: string = '';
  public isOpencreateCard: boolean = false;
  constructor(private trelloService: TrelloService) {

  }

  ngOnInit() {
  }


  public updateColumnTitle(columnId: number, headingElement: Event) {
    const heading = headingElement.target as HTMLHeadingElement;
    const newTitle = heading.textContent ?? "";

    var columns: Column[] = this.trelloService.columnList();
    var columnItem: Column | undefined = columns.find(column => column.id === columnId);

    if (columnItem === undefined || columnItem === null) {
      alert("Coluna não encontrada");
      return;
    }

    columnItem.title = newTitle;
    this.trelloService.updateColumnTitle(columnId, newTitle);

    heading.focus();
  }

  public columnList() {
    return this.trelloService.columnList();
  }

  public openCardName() {
    this.isOpencreateCard = true;
  }

  public closeCardName() {
    this.createCardTitle = '';
    this.isOpencreateCard = false;
  }


  public deleteColumn(columnId: number) {
    this.trelloService.deleteColumn(columnId);
    this.updateColumnList();
  }

  public createCard(columnId: number, title: string) {
    this.trelloService.createCard(columnId, title);
    this.updateColumnList();
  }

  public handleDeleteColumn(columnId: number) {
    this.deletedoColumn(columnId);
  }

  public getCardsForColumn(): Card[] {
    var card = this.trelloService.cardListByColumnId(this.column.id);
    return card;
  }
}
