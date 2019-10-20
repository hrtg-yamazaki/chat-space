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
        url: "/users",
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
          $("#user-search-result").empty();
        }

      })

      .fail(function() {
        alert("ユーザー検索に失敗しました");
      })

    });
  });
});


$(document).off("click", ".chat-group-user__btn--add")
$(document).on("click",".chat-group-user__btn--add", function(){
  $()
  userData = $(this).data();
  var name = userData.userName;
  var id = userData.userId;
  
  function appendMember(name, id) {
    var html = `
                <div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'> 
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>
                `

    $(".chat-group-users").append(html)
  }

  $(this).parent().remove();
  
  appendMember(name, id);

})

$(document).off("click", ".chat-group-user__btn--remove")
$(document).on("click", ".chat-group-user__btn--remove", function(){
  $(this).parent().remove();
})