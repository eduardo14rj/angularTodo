import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Column } from '../../interfaces/column';
import { TrelloService } from '../../services/trello.service';
import { Card } from '../../interfaces/card';

@Component({
  selector: 'app-column',
  standalone: false,
  templateUrl: './column.component.html',
  styleUrl: './column.component.css'
})
export class ColumnComponent implements OnInit {
  @Input() column!: Column;
  @Output() deleteColumn: EventEmitter<number> = new EventEmitter<number>();
  @Output() updateColumnList: EventEmitter<void> = new EventEmitter<void>();

  public createCardTitle: string = '';
  public isOpencreateCard: boolean = false;
  constructor(private trelloService: TrelloService) {
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

  ngOnInit() {
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


  // Método para deletar a coluna
  public onDeleteColumn() {
    this.trelloService.deleteColumn(this.column.id);
    this.deleteColumn.emit(this.column.id);
    this.updateColumnList.emit();
  }


  public createCard(columnId: number, title: string) {
    if (title === '') {
      alert("O nome do card não pode ser vazio");
      return;
    }
    this.closeCardName();
    this.createCardTitle = '';
    this.trelloService.createCard(columnId, title);
  }

  public handleDeleteColumn(columnId: number) {
    this.onDeleteColumn();
  }

  public getCardsForColumn(): Card[] {
    var card = this.trelloService.cardListByColumnId(this.column.id);
    return card;
  }
}
