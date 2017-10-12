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
    retries: 3
    // async: false,
    // success    : function(res){
    //   console.log(res);
    //   result = res;
    //   // let result = new Promise((res, _) => res)
    //   // return result;
    // },

    // error: () => {
    //   debugger;
    //   $.ajax(this);
    // }
    // error: function(){
    //   if(retries < 5){
    //     retries++;
    //     console.log('retries: ', retries)
    //     return getTasks(retries);
    //   } else {
    //     console.log('too many retries');
    //   }
    // }
  })

  // const fetchfunct = new Promise(() => result);

  // return fetchfunct;
}

function reFetch(){
  console.log('refetching funtion');
  return getTasks();
}
