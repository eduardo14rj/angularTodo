import { Injectable } from '@angular/core';
import { Column } from '../interfaces/column';
import { Card } from '../interfaces/card';

@Injectable({
  providedIn: 'root'
})
export class TrelloService {

  constructor() { }

  createColumn(columnTitle: string) {
    var columns: Column[] = this.columnList();

    const newColumn: Column = {
      id: Date.now(),
      title: columnTitle,
      order: columns.length + 1
    }

    columns.push(newColumn);

    localStorage.setItem('columns', JSON.stringify(columns))
  }

  updateColumnTitle(columnId: number, title: string) {
    var columns: Column[] = this.columnList();
    var columnItem: Column | undefined = columns.find(column => column.id === columnId);

    if (columnItem === undefined || columnItem === null) {
      alert("Coluna não encontrada");
      return;
    }

    columnItem.title! = title;
    localStorage.setItem('columns', JSON.stringify(columns))
  }


  columnList(): Column[] {
    var list = JSON.parse(localStorage.getItem('columns') || '[]') as Column[];
    return list;
  }


  deleteColumn(columnId: number) {
    const columns: Column[] = this.columnList();
    const updatedColumns = columns.filter(column => column.id !== columnId);
  
    if (updatedColumns.length === columns.length) {
      alert("Coluna não encontrada");
      return;
    }
  
    localStorage.setItem('columns', JSON.stringify(updatedColumns));
    // Se o seu método columnList() sempre buscar do localStorage, ele já refletirá essa mudança.
  }
  

  cardList() {
    var list = JSON.parse(localStorage.getItem('cards') || '[]') as Card[];
    return list;
  }

  cardListByColumnId(columnId: number) {
    var list = JSON.parse(localStorage.getItem('cards') || '[]') as Card[];
    var filtered = list.filter(x => x.columnId === columnId).sort((a, b) => {
      return a.order - b.order;
    });
    return filtered;
  }

  createCard(columnId: number, title: string) {
    var cards: Card[] = this.cardList();

    var columns: Column[] = this.columnList();
    var columnItem = columns.find(column => column.id === columnId);
    if (columnItem === null) {
      alert("Coluna não encontrada")
      return;
    }

    const newCard: Card = {
      id: Date.now(),
      title: title,
      order: cards.filter(x => x.columnId === columnId).length + 1,
      columnId: columnId
    }

    cards.push(newCard);
    localStorage.setItem('cards', JSON.stringify(cards))
  }


}
