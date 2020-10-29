function toRadians(degrees) {
    return degrees * Math.PI / 180;
};

function rotate(angle) {
    // Source https://stackoverflow.com/questions/20061774/rotate-an-image-in-image-source-in-html 
    console.log(angle);
    var rotate = 'rotate(' + angle + 'deg)';
    console.log(rotate);
    $('img').css({
        '-webkit-transform': rotate,
        '-moz-transform': rotate,
        '-o-transform': rotate,
        '-ms-transform': rotate,
        'transform': rotate
    });
}
function calculate_angle(curent_lat_lng, final_lat_lng) {
    if (curent_lat_lng && final_lat_lng) {
        // Reference https://stackoverflow.com/questions/3932502/calculate-angle-between-two-latitude-longitude-points
        lat2 = toRadians(final_lat_lng.lat);
        long2 = toRadians(final_lat_lng.lng);

        lat1 = toRadians(curent_lat_lng.lat);
        long1 = toRadians(curent_lat_lng.lng);

        dLon = (long2 - long1);

        y = Math.sin(dLon) * Math.cos(lat2);
        x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1)
            * Math.cos(lat2) * Math.cos(dLon);

        var angleRad = Math.atan2(y, x);
        //I want 0 to 360, so convert
        if (angleRad < 0) {
            angleRad += (2 * Math.PI);
        }
        var angleDeg = angleRad * 180 / Math.PI;
        return (angleDeg);
    } else {
        return 0;
    }
}

function getAngle() {
    $.get('http://localhost:8080', function (data, status) {
        console.log(data);
        data = JSON.parse(data);
        if (data !== null) {
            angle_degree = calculate_angle(data.current, data.final);
            console.log(angle_degree);
            rotate(angle_degree);
        }

    });
};

function startTimer() {
    setInterval(getAngle, 2000);
}