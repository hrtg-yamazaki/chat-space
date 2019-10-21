$(function() {
  function buildHTML(message){
    var html = `<div class="message" data-id= "${message.id}">
                <div class="message__info">
                  <p class="message__info__user">
                    ${message.user_name}
                  </p>
                  <p class="message__info__timestamp">
                    ${message.timestamp}
                  </p>
                </div>
                <div class="message__text">
                  ${ message.body ? message.body : ""}
                </div>
                <img src='${ message.image ? message.image : "" }'>
              </div>`
    return html;
  }
  
  
  $("#new_message").on("submit", function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $(".messages").append(html);
      $("#new_message")[0].reset();
      $(".messages").animate({
        scrollTop: $(".messages")[0].scrollHeight
      },1000);
    })
    .fail(function() {
      alert("メッセージを入力してください");
    })
    .always(function() {
      $(".form__submit-btn").removeAttr("disabled");
    })
  });

  var reloadMessages = function() {
    if (location.href.match(/\/groups\/\d+\/messages/)) {
      last_message_id = $(".message:last").data("id");
      $.ajax({
        url: "api/messages",
        type: "GET",
        dataType: "json",
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML ="";
        messages.forEach(function(message) {
          insertHTML = buildHTML(message);
          $(".messages").append(insertHTML);
          $(".messages").animate({
            scrollTop: $(".messages")[0].scrollHeight
          },1000);
        });
      })
      .fail(function() {
        alert("更新に失敗しました");
      });
      
    };
  }
  setInterval(reloadMessages, 5000);
});
