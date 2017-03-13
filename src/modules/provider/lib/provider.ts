export class Provider {

    protected _dataCollection: Set<any>;

    /**
     * Initialize Provider.
     */
    constructor() {
        this._dataCollection = new Set<any>();
    }
}
