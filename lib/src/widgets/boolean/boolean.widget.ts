import { Component } from '@angular/core';
import { ControlWidget } from '../../widget';

@Component({
    selector: 'nz-sf-boolean-widget',
    template: `
    <div *ngIf="schema.title" nz-form-label nz-col [nzSpan]="schema.span_label">
        <label nz-form-item-required [nzRequired]="required" [attr.for]="id">{{ schema.title }}</label>
    </div>
    <div nz-form-control nz-col
        [nzSpan]="schema.span_control"
        [nzOffset]="schema.span_label"
        [nzOffset]="schema.offset_control">
        <label nz-checkbox
            [formControl]="control">
            <span [innerHTML]="schema.description"></span>
        </label>
        <div nz-form-extra *ngIf="schema.extra" [innerHTML]="schema.extra"></div>
        <div nz-form-explain *ngIf="!onlyVisual && hasError">{{errorMessage}}</div>
    </div>`
})
export class BooleanWidget extends ControlWidget {
}
