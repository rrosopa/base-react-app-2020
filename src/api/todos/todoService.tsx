import { api } from "../apiBase";

export class TodoService {
    public getBooks(){
        console.log('getting books...');
        api.get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
            .then(result => {
                console.log(result);
            })
    }
}

class Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;

    constructor() {
        this.userId = 0;
        this.id = 0;
        this.title = '';
        this.completed = false;
    }
}