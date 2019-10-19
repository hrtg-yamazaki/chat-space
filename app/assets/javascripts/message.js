$(document).on("turbolinks:load",function(){
  $(function(){
    
    function appendUser(user) {

      var html = `
                  <div class= "chat-group-user clearfix">
                    <p class= "chat-group-user__name">${user.name}</p>
                    <div class= "user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id= "${user.id}" data-user-name="${user.name}">
                      追加
                    </div>
                  </div>
                  `

      $("#user-search-result").append(html)
    }

    function appendAlert() {

      var html = `
                  <div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">ユーザーが見つかりません</p>
                  </div>
                  `
      $("#user-search-result").append(html)
    }

    $("#user-search-field").on("input", function(e) {

      var input = $("#user-search-field").val();

      $.ajax({
        url: "/users/index",
        type: "GET",
        data: { keyword: input },
        dataType: "json"
      })

      .done(function(users) {
        $("#user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            appendUser(user);
          });
        } else {
          appendAlert();
        }
        if (input.length === 0) {
          $(".chat-group-user").remove();
        }
      })

      .fail(function() {
        alert("ユーザー検索に失敗しました");
      })

    });
  });
});

