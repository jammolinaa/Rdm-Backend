import { HttpStatus } from '@nestjs/common';

export class Verbose {
  constructor(public nameEntity: string) {}
  conflict(): [string, HttpStatus] {
    return [`${this.nameEntity} already exist`, HttpStatus.CONFLICT];
  }
  notFound(): [string, HttpStatus] {
    return [`${this.nameEntity} not found`, HttpStatus.NOT_FOUND];
  }
  dataIsSame(): [string, HttpStatus] {
    return [`The data of ${this.nameEntity} is same`, HttpStatus.BAD_REQUEST];
  }
  badRequest(additionalMessage?: string): [string, HttpStatus] {
    return [
      `Bad request for resource ${this.nameEntity}, please review the request data${additionalMessage ? ': ' + additionalMessage : ''}`,
      HttpStatus.BAD_REQUEST,
    ];
  }
}
