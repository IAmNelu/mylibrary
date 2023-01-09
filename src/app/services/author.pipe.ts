import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'authorName',
  standalone: true
})

export class AuthorNamePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return (value as string).split(' ').map(val => val[0]).join('');
  }
}