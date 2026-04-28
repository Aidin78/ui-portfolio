
var Cal = function (divId) {

    //Store div id
    this.divId = divId;

    // Days of week, starting on Sunday
    this.DaysOfWeek = [
        'Su',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat'
    ];

    // Months, stating on January
    this.Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // Set the current month, year
    var d = new Date();

    this.currMonth = d.getMonth();
    this.currYear = d.getFullYear();
    this.currDay = d.getDate();

};

// Goes to next month
Cal.prototype.nextMonth = function () {
    if (this.currMonth == 11) {
        this.currMonth = 0;
        this.currYear = this.currYear + 1;
    }
    else {
        this.currMonth = this.currMonth + 1;
    }
    this.showcurr();
};

// Goes to previous month
Cal.prototype.previousMonth = function () {
    if (this.currMonth == 0) {
        this.currMonth = 11;
        this.currYear = this.currYear - 1;
    }
    else {
        this.currMonth = this.currMonth - 1;
    }
    this.showcurr();
};

// Show current month
Cal.prototype.showcurr = function () {
    this.showMonth(this.currYear, this.currMonth);
};

// Show month (year, month)
Cal.prototype.showMonth = function (y, m) {

    var d = new Date()
        // First day of the week in the selected month
        , firstDayOfMonth = new Date(y, m, 1).getDay()
        // Last day of the selected month
        , lastDateOfMonth = new Date(y, m + 1, 0).getDate()
        // Last day of the previous month
        , lastDayOfLastMonth = m == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();


    var html = '<table>';

    // Write selected month and year
    html += '<thead><tr>';
    html += '<td>' + this.Months[m] + ' ' + y + '</td>';
    html += '</tr></thead>';


    // Write the header of the days of the week
    html += '<tr class="days">';
    for (var i = 0; i < this.DaysOfWeek.length; i++) {
        html += '<td>' + this.DaysOfWeek[i] + '</td>';
    }
    html += '</tr>';

    // Write the days
    var i = 1;
    do {

        var dow = new Date(y, m, i).getDay();

        // If Sunday, start new row
        if (dow == 0) {
            html += '<tr>';
        }
        // If not Sunday but first day of the month
        // it will write the last days from the previous month
        else if (i == 1) {
            html += '<tr>';
            var k = lastDayOfLastMonth - firstDayOfMonth + 1;
            for (var j = 0; j < firstDayOfMonth; j++) {
                html += '<td class="not-current">' + k + '</td>';
                k++;
            }
        }

        // Write the current day in the loop
        var chk = new Date();
        var chkY = chk.getFullYear();
        var chkM = chk.getMonth();
        if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
            html += '<td  date-month="' + this.currMonth + '" date-day="' + i + '" date-year="' + this.currYear + '" class="normal day">' + i + '</td>';
        } else {
            html += '<td  date-month="' + this.currMonth + '" date-day="' + i + '" date-year="' + this.currYear + '" class="normal day">' + i + '</td>';
        }
        // If Saturday, closes the row
        if (dow == 6) {
            html += '</tr>';
        }
        // If not Saturday, but last day of the selected month
        // it will write the next few days from the next month
        else if (i == lastDateOfMonth) {
            var k = 1;
            for (dow; dow < 6; dow++) {
                html += '<td class="not-current">' + k + '</td>';
                k++;
            }
        }

        i++;
    } while (i <= lastDateOfMonth);

    // Closes table
    html += '</table>';

    // Write HTML to the div
    document.getElementById(this.divId).innerHTML = html;
};

// On Load of the window
window.onload = function () {

    // Start calendar
    var c = new Cal("divCal");
    c.showcurr();

    // Bind next and previous button clicks
    getId('btnNext').onclick = function () {
        c.nextMonth();
    };
    getId('btnPrev').onclick = function () {
        c.previousMonth();
    };
    findEventsInCalendar();
    $('.btn-next, .btn-prev').click(function (e) {
        findEventsInCalendar();
    })
}

// Get element by id
function getId(id) {
    return document.getElementById(id);
}
$(document).ready(function () {

    $('[data-toggle="tooltip"]').tooltip();
});

jQuery(document).ready(function ($) {
    $(".event").each(function () {
        var date = $(this).attr("date-day") + "/" + $(this).attr("date-month") + "/" + $(this).attr("date-year");
    });
});

const findEventsInCalendar = function () {
    var eventDates = [];

    $('.day-event').each(function (i, elem) {
        eventDates[i] = [$(elem).attr("date-year"), parseInt($(elem).attr("date-month")) - 1, $(elem).attr("date-day")]
    });
    $('.calendar td.day').each(function (i, elem) {
        var year = $(elem).attr("date-year"), month = $(elem).attr("date-month"), day = $(elem).attr("date-day");
        if (year != '') {
            for (var j = 0; j < eventDates.length; j++) {
                if (!$(elem).hasClass('has')) {
                    if (parseInt(year) === parseInt(eventDates[j][0]) && parseInt(month) === parseInt(eventDates[j][1]) && parseInt(day) === parseInt(eventDates[j][2])) {
                        var temp = $('.day-event[date-day=' + eventDates[j][2] + ']');
                        $(elem).addClass('has');
                        if ($(temp).length > 1) {
                            let eventContainer;
                            eventContainer = $(`<div class="tooltip-container"></div>`).html($(temp));
                            $(elem).append(eventContainer);
                            $(elem).append(`<span class="back"></span>`);

                        }
                        else {
                            $(elem).append($(temp).clone());
                            $(elem).append(`<span class="back"></span>`);
                        };
                    }
                }
            }
        }
    })
}
