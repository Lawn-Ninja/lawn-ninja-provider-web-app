import React from "react";

const FriendlyTime = (props) => {
  var time = new Date(props.time)
  console.log(time);
  var minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  var hours = time.getHours();
  var amPm = "AM";
  if (hours > 12) {
    hours -= 12;
    amPm = "PM";
  } else if (hours === 12) {
    amPm = "PM";
  } else if (hours === 0) {
    hours = 12;
  }
  var month = time.getMonth() + 1;
  var day = time.getDate();
  var year = time.getFullYear() % 100;
  return (
    <span>
      {hours}:{minutes} {amPm} on {month}/{day}/{year}
    </span>
  )
}

export default FriendlyTime;