export class Project {
    constructor(id, title, archived = false) {
        this.id = id;
        this.title = title;
        this.archived = archived;
    }
}

export class Task {
    constructor(id, title, priority, deadline, complete = false) {
        this.id = id;
        this.title = title;
        this.priority = priority;
        this.deadline = deadline;
        this.complete = complete;
    }
}
