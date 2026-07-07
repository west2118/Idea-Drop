"use client";

import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { updateTaskStatus } from "@/lib/actions/task.actions";
import { toast } from "react-toastify";
import { CheckCircle } from "lucide-react";

export default function TaskBoard({ tasks: initialTasks, currentUser, collaborationOwnerId, onTaskUpdated, disabled }: any) {
  const [tasks, setTasks] = useState(initialTasks || []);
  
  // Re-sync tasks if initialTasks change
  useEffect(() => {
    setTasks(initialTasks || []);
  }, [initialTasks]);

  const columns = ["Todo", "In Progress", "Completed", "Cancelled"];

  const getTasksByStatus = (status: string) => {
    return tasks.filter((t: any) => t.status === status);
  };

  const onDragEnd = async (result: any) => {
    if (disabled) {
      toast.error("This collaboration is no longer active.");
      return;
    }
    
    if (!result.destination) return;
    const { source, destination, draggableId } = result;

    if (source.droppableId === destination.droppableId) return;

    const taskToMove = tasks.find((t: any) => t._id === draggableId);
    if (!taskToMove) return;

    // Check permissions
    const isOwner = currentUser?._id === collaborationOwnerId;
    const isTaskCreator = currentUser?._id === taskToMove.createdBy?._id;

    if (!isOwner && !isTaskCreator) {
      toast.error("Only the task creator or collaboration owner can move this task.");
      return;
    }

    const newStatus = destination.droppableId;
    const previousStatus = taskToMove.status;

    // Optimistic update
    const updatedTasks = tasks.map((t: any) => 
      t._id === draggableId ? { ...t, status: newStatus } : t
    );
    setTasks(updatedTasks);

    try {
      const updatedTask = await updateTaskStatus(draggableId, newStatus);
      if (onTaskUpdated) {
        // Pass back fully populated createdBy so the UI renders correctly
        onTaskUpdated({ ...updatedTask, createdBy: taskToMove.createdBy });
      }
      toast.success("Task updated");
    } catch (error: any) {
      toast.error(error.message);
      // Revert if error
      setTasks(tasks.map((t: any) => 
        t._id === draggableId ? { ...t, status: previousStatus } : t
      ));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
        {columns.map((columnId) => (
          <Droppable key={columnId} droppableId={columnId}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`border rounded-lg p-4 min-h-[200px] transition-colors ${snapshot.isDraggingOver ? "bg-gray-50" : "bg-white"}`}
              >
                <h3 className={`font-medium mb-3 ${columnId === 'Completed' ? 'text-green-700' : columnId === 'In Progress' ? 'text-blue-700' : columnId === 'Cancelled' ? 'text-red-700' : 'text-gray-700'}`}>
                  {columnId}
                </h3>
                <div className="space-y-3">
                  {getTasksByStatus(columnId).map((task: any, index: number) => (
                    <Draggable key={task._id} draggableId={task._id} index={index} isDragDisabled={disabled}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`bg-white p-3 rounded border shadow-sm ${snapshot.isDragging ? "shadow-md ring-2 ring-blue-400" : ""}`}
                          style={{
                            ...provided.draggableProps.style,
                          }}
                        >
                          <div className="flex justify-between">
                            <h4 className="font-medium text-sm">{task.title}</h4>
                          </div>
                          {task.description && (
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{task.description}</p>
                          )}
                          <div className="flex justify-between items-center mt-3">
                            <div className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-600">
                              By {task.createdBy?.firstName} {task.createdBy?.lastName}
                            </div>
                            {columnId === 'Completed' && (
                              <CheckCircle className="h-3 w-3 text-green-600" />
                            )}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
