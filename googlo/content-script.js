function deleteBlock() {
  if (!!document.getElementsByClassName(
    "ContributionCalendar-day"
  )) {
    let elems = document.getElementsByClassName(
      "ContributionCalendar-day"
    )
    // for (let i = 0; i < elems.length - 5; i++) {
    //   elems[i].dataset.level = Math.floor(Math.random() * 5);
    // }
    // let time1 = setInterval(() => {
    //   for (let i = 0; i < elems.length - 5; i++) {
    //     elems[i].dataset.level = Math.floor(Math.random() * 5);
    //   }}
    // , 40)
    // let time2 = setInterval(() => {
    //   for (let i = 0; i < elems.length - 5; i++) {
    //     elems[i].style.backgroundColor = "#"
    //     + Math.floor(Math.random() * 90 + 10)
    //     + Math.floor(Math.random() * 90 + 10)
    //     + Math.floor(Math.random() * 90 + 10);
    //   }}
    // , 40)
    // let time3 = setInterval(() => {
    //   for (let i = 0; i < elems.length - 5; i++) {
    //     elems[i].style.backgroundColor = "#"
    //     + Math.floor(Math.random() * 90 + 10) + "0000";
    //   }}
    // , 40)

    for (let i = 0; i < elems.length - 5; i++) {
      elems[i].style.transition = "linear 0.25s"
    }
    daysExit = 5
    let rainbow = ["red", "orange", "yellow", "lime", "cyan", "blue", "violet", "red", "orange", "yellow", "lime", "cyan", "blue", "violet"]
    let count = 7;
    let time4 = setInterval(() => {
      if (count === 0) {
        count = 8;
      }
      count--;
      for (let i = 0; i < (elems.length - daysExit) / 7; i++) {
        elems[i].style.backgroundColor = rainbow[(i+count) % 7];
        elems[i+(elems.length - daysExit) / 7].style.backgroundColor = rainbow[(i+count) % 7];
        elems[i+2*(elems.length - daysExit) / 7].style.backgroundColor = rainbow[(i+count) % 7];
        elems[i+3*(elems.length - daysExit) / 7].style.backgroundColor = rainbow[(i+count) % 7];
        elems[i+4*(elems.length - daysExit) / 7].style.backgroundColor = rainbow[(i+count) % 7];
        elems[i+5*(elems.length - daysExit) / 7].style.backgroundColor = rainbow[(i+count) % 7];
        elems[i+6*(elems.length - daysExit) / 7].style.backgroundColor = rainbow[(i+count) % 7];
      }}
    , 250)
  }
  
}

deleteBlock();