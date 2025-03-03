$(document).ready(function () {
  // Owl Carousel Initialization
  $(".user-status-slider").owlCarousel({
    items: 4,
    loop: false,
    margin: 16,
    nav: false,
    dots: false,
  });

  // Dropdown Toggle and Outside Click Close
  $(document).on("click", ".dropdown-toggle", function (e) {
    e.preventDefault(); // Prevent default anchor behavior

    // Close all other dropdowns before opening the clicked one
    $(".dropdown-menu").not($(this).next()).hide();

    // Toggle the clicked dropdown
    $(this).next(".dropdown-menu").toggle();
  });

  // Close dropdown when clicking outside
  $(document).click(function (e) {
    if (!$(e.target).closest(".dropdown").length) {
      $(".dropdown-menu").hide();
    }
  });

  // Send Message Functionality
  function sendMessage() {
    var message = $(".chat-input-field input").val().trim();
    if (message !== "") {
      var newMessage = `
        <li class="right">
          <div class="conversation-list">
            <div class="chat-avatar">
              <img src="assets/images/users/avatar-1.jpg" alt="">
            </div>
            <div class="user-chat-content">
              <div class="chat-content-wrap">
                <div class="ctext-wrap-content">
                  <p class="mb-0">${message}</p>
                  <p class="chat-time">
                    <i class="fa-solid fa-clock"></i>
                    <span class="align-middle">${new Date().toLocaleTimeString(
                      [],
                      { hour: "2-digit", minute: "2-digit" }
                    )}</span>
                  </p>
                </div>
                <div class="dropdown">
                  <a class="dropdown-toggle" href="#">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                  </a>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="#">Copy <i class="fa-solid fa-copy"></i></a>
                    <a class="dropdown-item" href="#">Save <i class="fa-solid fa-floppy-disk"></i></a>
                    <a class="dropdown-item" href="#">Forward <i class="fa-solid fa-share"></i></a>
                    <a class="dropdown-item" href="#">Reply <i class="fa-solid fa-reply"></i></a>
                    <a class="dropdown-item" href="#">Delete <i class="fa-solid fa-trash-can"></i></a>
                  </div>
                </div>
              </div>
              <div class="conversation-name">You</div>
            </div>
          </div>
        </li>`;

      $(".list-unstyled").append(newMessage);
      $(".chat-input-field input").val(""); // Clear input field

      // Auto-scroll to the bottom
      $(".chat-conversation").scrollTop(
        $(".chat-conversation")[0].scrollHeight
      );
    }
  }

  // Send message on button click
  $(".chat-input-btn button").on("click", function (e) {
    e.preventDefault();
    sendMessage();
  });

  // Send message on Enter key press
  $(".chat-input-field input").on("keypress", function (e) {
    if (e.which === 13) {
      // Check if Enter key is pressed
      e.preventDefault();
      sendMessage();
    }
  });

  // Search chat list by name
  $("#chatSearch").on("keyup", function () {
    var value = $(this).val().toLowerCase();

    $(".chat-list li").filter(function () {
      var name = $(this).find(".chat-user-name").text().trim().toLowerCase();
      $(this).toggle(name.includes(value));
    });
  });

  // Open/Close Profile Sidebar
  $(".open-profile").click(function (e) {
    e.preventDefault();
    $(".profile-sidebar").addClass("active"); // Open sidebar
  });

  $(".profile-close").click(function () {
    $(".profile-sidebar").removeClass("active"); // Close sidebar
  });

  // Message search functionality
  $("#messageSearch").on("keyup", function () {
    var searchText = $(this).val().toLowerCase();

    $(".conversation-list").each(function () {
      var messageText = $(this)
        .find(".ctext-wrap-content .chat-message")
        .text()
        .toLowerCase();
      var senderName = $(this).find(".conversation-name").text().toLowerCase();

      if (messageText.includes(searchText) || senderName.includes(searchText)) {
        $(this).parent().show(); // Show matching messages
      } else {
        $(this).parent().hide(); // Hide non-matching messages
      }
    });
  });

  // Delete and Clear Chat
  $(".dropdown-menu").on("click", ".delete-chat", function () {
    if (
      confirm(
        "Are you sure you want to delete this chat? This action cannot be undone!"
      )
    ) {
      $(".chat-conversation").remove(); // Removes entire chat section
    }
  });

  $(".dropdown-menu").on("click", ".clear-chat", function () {
    if (confirm("Are you sure you want to clear all chat messages?")) {
      $(".chat-conversation ul").empty(); // Removes only chat messages
    }
  });

  // Open/Close Chat Sidebar
  $(".open-chat").click(function (e) {
    e.preventDefault();
    $(".chat-wapper").addClass("active"); // Open sidebar
  });

  $(".back-btn").click(function () {
    $(".chat-wapper").removeClass("active"); // Close sidebar
  });
});
