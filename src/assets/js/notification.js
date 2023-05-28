export class NotificationCenter {
    constructor() {
        this.list = [];
    }
  
    addNotification(notifObject) {
        notifObject.id = this.list.length;
        this.list.push(notifObject);
    }
}

export class Notification {
    constructor(componentName, content) {
        this.id = 0;
        this.componentName = componentName;
        this.content = content;
    }
}