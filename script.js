$(document).ready(function() {
    // Display current day
    $("#currentDay").text(dayjs().format("dddd, MMMM D"));

    var businessHours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];
    var currentTime = dayjs().hour();

    businessHours.forEach(function(hour, index) {
        var timeBlock = $("<div>").addClass("time-block");
        var label = $("<label>").text(hour);
        var input = $("<input>").attr("data-hour", index + 9); // data-hour starts from 9
        var saveBtn = $("<button>").addClass("save-btn").text("Save");

        timeBlock.append(label, input, saveBtn);
        $(".container").append(timeBlock);

     
        if (index + 9 < currentTime) {
            input.addClass("past");
        } else if (index + 9 === currentTime) {
            input.addClass("present");
        } else {
            input.addClass("future");
        }
    });

    $(".time-block input").each(function() {
        var hour = $(this).data("hour");
        var savedEvent = localStorage.getItem("event-" + hour);

        if (savedEvent) {
            $(this).val(savedEvent);
        }
    });

    $(".save-btn").click(function() {
        var hour = $(this).prev().prev().data("hour");
        var eventText = $(this).prev().val();
        localStorage.setItem("event-" + hour, eventText);
        alert("Event saved!");
    });
});

