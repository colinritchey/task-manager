let tasks = { 1: {id: 1, content: 'asdf'}, 2: {id: 2, content: 'jklk'}}

export const postTasks = (tasks) => (
  $.ajax({
    url : "http://cfassignment.herokuapp.com/colinritchey/tasks",
    type: "POST",
    data: JSON.stringify({tasks}),
    contentType: "application/json; charset=utf-8",
    dataType   : "json",
    success    : function(res){
      console.log(res);
    }
  })
);

export const getTasks = () => {
  let result = {};

  $.ajax({
    url : "http://cfassignment.herokuapp.com/colinritchey/tasks",
    type: "GET",
    async: false,
    success    : function(res){
      result = res;
      // console.log(res, "in get request");
    }
  })

  return result;
}
