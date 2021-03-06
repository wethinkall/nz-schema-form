import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { ControlWidget } from '../../widget';

@Component({
    selector: 'nz-sf-transfer-widget',
    template: `
    <div *ngIf="schema.title" nz-form-label nz-col [nzSpan]="schema.span_label">
        <label nz-form-item-required [nzRequired]="required" [attr.for]="id">
            <span>
                {{ schema.title }}
                <nz-tooltip *ngIf="showDescription && description" [nzTitle]="description">
                    <i nz-tooltip class="anticon anticon-question-circle-o"></i>
                </nz-tooltip>
            </span>
        </label>
    </div>
    <div nz-form-control nz-col
        [nzSpan]="schema.span_control"
        [nzOffset]="schema.offset_control">
        <nz-transfer
            [nzDataSource]="_dataSource"
            [nzTitles]="titles"
            [nzOperations]="operations"
            [nzListStyle]="listStyle"
            [nzItemUnit]="itemUnit"
            [nzItemsUnit]="itemsUnit"
            [nzShowSearch]="showSearch"
            [nzFilterOption]="filterOption"
            [nzSearchPlaceholder]="searchPlaceholder"
            [nzNotFoundContent]="notFoundContent"
            [canMove]="_canMove"
            (nzChange)="_change($event)"
            (nzSearchChange)="_searchChange($event)"
            (nzSelectChange)="_selectChange($event)">
        </nz-transfer>
        <div nz-form-extra *ngIf="extra" [innerHTML]="extra"></div>
        <div nz-form-explain *ngIf="!onlyVisual && hasError">{{errorMessage}}</div>
    </div>`
})
export class TransferWidget extends ControlWidget implements OnInit {

    _dataSource: any[] = [];
    private _data: any[] = [];

    ngOnInit(): void {
        this._dataSource = this.widgetData.dataSource || [];
        this._data = this._dataSource.filter(w => w.direction === 'right');
        this.updateValue();
    }

    private updateValue() {
        this.formProperty.setValue(this._data, false);
    }

    // region: fiedls

    get titles() {
        return this.widgetData.titles || ['', ''];
    }

    get operations() {
        return this.widgetData.operations || ['', ''];
    }

    get listStyle() {
        return this.widgetData.listStyle;
    }

    get itemUnit() {
        return this.widgetData.itemUnit || '项目';
    }

    get itemsUnit() {
        return this.widgetData.itemsUnit || '项目';
    }

    get showSearch() {
        return this.widgetData.showSearch;
    }

    get filterOption() {
        return this.widgetData.filterOption;
    }

    get searchPlaceholder() {
        return this.widgetData.searchPlaceholder;
    }

    get notFoundContent() {
        return this.widgetData.notFoundContent;
    }

    // endregion

    _canMove = (arg: any): Observable<any[]> => {
        return this.widgetData.canMove ? this.widgetData.canMove(arg) : of(arg.list);
    }

    _change(options: any) {
        if (options.to === 'right') {
            this._data = this._data.concat(...options.list);
        } else {
            this._data = this._data.filter(w => options.list.indexOf(w) === -1);
        }
        if (this.widgetData.change) this.widgetData.change(options);
        this.updateValue();
    }

    _searchChange(options: any) {
        if (this.widgetData.searchChange) this.widgetData.searchChange(options);
    }

    _selectChange(options: any) {
        if (this.widgetData.selectChange) this.widgetData.selectChange(options);
    }
}
