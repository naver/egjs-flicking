class SvelteElementProvider {
    constructor(el) {
        this._el = el;
    }
    get element() { return this._el.nativeElement(); }
    get rendered() { return this._el.rendered(); }
    show() {
        this._el.show();
    }
    hide() {
        this._el.hide();
    }
    setOrder(val) {
        this._el.setOrder(val);
    }
}
export default SvelteElementProvider;
