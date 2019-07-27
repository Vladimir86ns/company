const initialData = {
    tasks: {
      task1: { id: "task1", content: "Take out the garbage" },
      task2: { id: "task2", content: "Watch my favorite show" },
      task3: { id: "task3", content: "Charge my phone" },
      task4: { id: "task4", content: "Cook dinner" },
      task5: { id: "task5", content: "Take out the garbage" },
      task6: { id: "task6", content: "Watch my favorite show" },
      task7: { id: "task7", content: "Charge my phone" },
      task8: { id: "task8", content: "Cook dinner" },
      task9: { id: "task9", content: "Take out the garbage" },
      task10: { id: "task10", content: "Watch my favorite show" },
      task11: { id: "task11", content: "Charge my phone" },
      task12: { id: "task12", content: "Cook dinner" }
    },
    columns: {
      column1: {
        id: "column1",
        title: "To do",
        taskIds: ["task1", "task2", "task3", "task4","task5", "task6", "task7", "task8","task9", "task10", "task11", "task12"]
      },
      column2: {
        id: "column2",
        title: "In progress",
        taskIds: []
      },
      column3: {
        id: "column3",
        title: "Done",
        taskIds: []
      }
    },
    // Facilitate reordering of the columns
    columnOrder: ["column1", "column2", "column3"]
  };
  
  export default initialData;