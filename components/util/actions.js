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

export const getTasks = (retries = 0) => {
  // let result = {};

  return $.ajax({
    url : "http://cfassignment.herokuapp.com/colinritchey/tasks",
    type: "GET",
    // async: false,
    // success    : function(res){
    //   result = res;
    // },
    error: function(){
      if(retries < 5){
        retries++;
        return getTasks(retries);
      } else {
        console.log('too many retries');
      }
    }
  })

  // return result;
}
