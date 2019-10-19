$(function() {
    function buildHTML(message){
    var html = `<div class="message">
                <div class="message__info">
                  <p class="message__info__user">
                    ${message.user_name}
                  </p>
                  <p class="message__info__timestamp">
                    ${message.timestamp}
                  </p>
                </div>
                <div class="message__text">
                  ${message.body}
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
      $(".new-post__box__text").val("");
      $(".new-post__box__image__file").val("");
      $(".messages").animate({
        scrollTop: $(".messages")[0].scrollHeight},1000);
    })
    .fail(function() {
      alert("メッセージを入力してください");
    })
  });
});



