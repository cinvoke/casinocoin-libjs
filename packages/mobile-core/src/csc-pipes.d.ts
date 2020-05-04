import { PipeTransform } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
export declare class CSCDatePipe implements PipeTransform {
    private datePipe;
    constructor(datePipe: DatePipe);
    transform(value: number, format: string): string;
}
export declare class CSCAmountPipe implements PipeTransform {
    private numberPipe;
    constructor(numberPipe: DecimalPipe);
    transform(value: any, includeCurrency: boolean, numberFormat: boolean): string;
}
export declare class ToNumberPipe implements PipeTransform {
    transform(value: string): any;
}
