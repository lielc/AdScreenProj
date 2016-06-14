app.filter('numToDay', [function() {
    return function (dayNum) {
        var dayNames = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday' ];
        return dayNames [dayNum - 1];
    }
}]);