$(function(){

  $("#user-search-field").on("input", function(e) {
    e.preventDefault();
    var input = $("#user-search-field").val();
    $.ajax({
      url: "/users/index",
      type: "GET",
      data: { keyword: input },
      dataType: "json"
    });
    
  });
});