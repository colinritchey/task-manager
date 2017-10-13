export const postTasks = (tasks) => (
  $.ajax({
    url : "http://cfassignment.herokuapp.com/colinritchey/tasks",
    type: "POST",
    data: JSON.stringify({tasks}),
    contentType: "application/json; charset=utf-8",
    dataType   : "json"
  })
);

export const getTasks = (retries = 0) => {
  return $.ajax({
    url : "http://cfassignment.herokuapp.com/colinritchey/tasks",
    type: "GET"
  })
}
