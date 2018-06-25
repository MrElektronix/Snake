class EventEmitter {

    constructor() {
        this.events = {};
    }

    addListener(event, callback) {
        this.events[ event ] = this.events[ event ] || [];

        this.events[ event ].push(callback);
    }

    removeListener(event, callback) {
        if ( !this.eventListExists(event) ){
            return;
        }

        let index = this.events[ event ].indexOf(callback);

        if ( index == -1 ){
            return;
        }

        this.events[ event ].splice(index, 1);
    }

    emit(event, ...args) {
        if ( !this.eventListExists(event) ){
            return;
        }

        const callbacks = this.events[ event ];

        callbacks.forEach(calback => calback(...args));
    }

    eventListExists(event) {
        return typeof this.events[ event ] === 'object';
    }

}