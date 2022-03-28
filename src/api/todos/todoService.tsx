import { AxiosResponse } from "axios";
import { appApi } from "../api-base";

export class TodoService {
    public async getBooks() : Promise<AxiosResponse<Todo[]>>{
        console.log('getting books...');
        return appApi.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
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