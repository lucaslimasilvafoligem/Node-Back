import Task from "../models/Task.mjs";

export default class TaskController {
    static createTask(req, res) {
        res.render('tasks/crate');
    }
}
