import {Component, ElementRef, Input, Output, EventEmitter} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

@Component({
    selector: 'md2-dialog',
    template: `
    <div class="md2-dialog" [class.open]="displayed" tabindex="-1" role="dialog" aria-labelledby="myDialogLabel" aria-hidden="true" [style.display]="displayed ? 'block' : 'none'">
        <div class="md2-dialog-container" role="document">
            <div class="md2-dialog-header" *ngIf="dialogTitle">
                <button *ngIf="closeButton" type="button" class="close" aria-label="Close" (click)="show(false)">&times;</button>
                <h2 class="md2-dialog-title" id="myDialogLabel">{{dialogTitle}}</h2>
            </div>
            <ng-content></ng-content>
        </div>
    </div>
    `,
    styles: [`
    .md2-dialog { position: fixed; top: 0; right: 0; bottom: 0; left: 0; z-index: 1050; background-color: rgba(33, 33, 33, 0.48); display: none; overflow-x: hidden; overflow-y: auto; -webkit-overflow-scrolling: touch; outline: 0; }
    .md2-dialog.open { display: block; }
    .md2-dialog .md2-dialog-container { position: relative; width: auto; margin: 15px; background-color: #fff; -webkit-background-clip: padding-box; -moz-background-clip: padding-box; background-clip: padding-box; border-radius: 4px; outline: 0; -webkit-box-shadow: 0 7px 8px -4px rgba(0,0,0,.2),0 13px 19px 2px rgba(0,0,0,.14),0 5px 24px 4px rgba(0,0,0,.12); box-shadow: 0 7px 8px -4px rgba(0,0,0,.2),0 13px 19px 2px rgba(0,0,0,.14),0 5px 24px 4px rgba(0,0,0,.12); -webkit-transition: -webkit-transform .3s ease-out; -o-transition: -o-transform .3s ease-out; -moz-transition: transform .3s ease-out; transition: transform .3s ease-out; -webkit-transform: scale(0.1); -ms-transform: scale(0.1); -o-transform: scale(0.1); -moz-transform: scale(0.1); transform: scale(0.1); }
    .md2-dialog.open .md2-dialog-container { -webkit-transform: scale(1); -ms-transform: scale(1); -o-transform: scale(1); -moz-transform: scale(1); transform: scale(1); }

    @media (min-width: 768px) {
        .md2-dialog .md2-dialog-container { width: 600px; margin: 30px auto; }
    }

    .md2-dialog-header { background: #2196f3; padding: 1rem; border-bottom: 1px solid #e5e5e5; }
    .md2-dialog-header .close { -webkit-appearance: none; padding: 0; cursor: pointer; background: 0 0; border: 0; float: right; font-size: 35px; line-height: 27px; color: #fff; opacity: 0.8; }
    .md2-dialog-header .close:hover { opacity: 1; }
    .md2-dialog-header .md2-dialog-title { margin: 0; color: #fff; }
    .md2-dialog-body { position: relative; padding: 1rem; }
    .md2-dialog-footer { padding: 1rem; text-align: right; border-top: 1px solid rgba(0,0,0,0.12); }
`],
    host: {
        '(click)': 'clickElement($event)'
    },
    directives: [CORE_DIRECTIVES]
})

export class Md2Dialog {
    private _el: HTMLElement;
    displayed: boolean = false;
    @Input() closeOnUnfocus: boolean = true;
    @Input() closeButton: boolean = true;
    @Input() dialogTitle: string = '';

    constructor(el: ElementRef) {
        this._el = el.nativeElement;
    }

    clickElement(e: any) {
        if (this.closeOnUnfocus) {
            if (e.srcElement.className == 'modal customFadeIn' || e.srcElement.className == 'modal-dialog') {
                this.show(false);
            }
        }
    }

    getElement(): HTMLElement {
        return this._el;
    }

    hide(): boolean {
        return this.show(false);
    }

    show(isDisplayed: boolean): boolean {
        var body = document.body;
        if (isDisplayed === undefined) {
            this.displayed = !this.displayed;
        } else {
            this.displayed = isDisplayed;
        }

        if (this.displayed) {
            body.classList.add('modal-open');
        } else {
            body.classList.remove('modal-open');
            if (this.closeOnUnfocus) {
                this._el.childNodes[0].removeEventListener('click', (e: Event) => {
                    if (e.srcElement.className == 'modal customFadeIn' || e.srcElement.className == 'modal-dialog') {
                        this.show(false);
                    }
                });
            }
        }
        return false;
    }
}