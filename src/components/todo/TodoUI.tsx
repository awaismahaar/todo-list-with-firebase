import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { TodoItem } from "@/pages/Todo";
import { CircleCheckBig, Edit, ShieldX, Trash } from "lucide-react";
import { Spinner } from "../ui/spinner";
import type { Ref } from "react";
interface TodoProps {
  tasks: TodoItem[];
  loading : boolean;
  searchInput: Ref<HTMLInputElement> | null;
  editId: string | null;
  addOrUpdateTodoInList: () => void;
  editTodo: (task: TodoItem) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
}

const TodoUI = ({
  tasks,
  addOrUpdateTodoInList,
  deleteTodo,
  editId,
  editTodo,
  searchInput,
  toggleTodo,
  loading
}: TodoProps) => {
  return (
    <div>
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Todo App</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <Input ref={searchInput} placeholder="Add your new todo" />
              <Button onClick={addOrUpdateTodoInList} variant="default">
                {editId ? "Update" : "Add"}
              </Button>
            </div>
            {loading ? (
              <div className="flex justify-center pt-2">
                <Spinner />
              </div>
            ) : (
              <>
                <div>
                  <ul className="space-y-2">
                    {tasks.length > 0 ? (
                      tasks.map((task) => {
                        return (
                          <li
                            key={task.id}
                            className={`p-2 ${
                              task.completed ? "bg-green-300" : "bg-gray-200"
                            }  rounded-sm flex items-center justify-between gap-4`}
                          >
                            <span>{task.text}</span>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                onClick={() => editTodo(task)}
                                size="icon"
                                className="rounded-full"
                              >
                                <Edit />
                              </Button>
                              <Button
                                onClick={() => deleteTodo(task.id)}
                                variant="outline"
                                size="icon"
                                className="rounded-full"
                              >
                                <Trash />
                              </Button>
                              <Button
                                onClick={() => toggleTodo(task.id)}
                                variant="outline"
                                size="icon"
                                className="rounded-full"
                              >
                                {task.completed ? (
                                  <ShieldX />
                                ) : (
                                  <CircleCheckBig />
                                )}
                              </Button>
                            </div>
                          </li>
                        );
                      })
                    ) : (
                      <p className="text-gray-800 text-center">No tasks...</p>
                    )}
                  </ul>
                </div>
                <div>
                  <p>
                    You have{" "}
                    {tasks.filter((task) => task.completed !== true).length}{" "}
                    pending tasks
                  </p>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TodoUI;
