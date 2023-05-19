export const Functions = {
  getDate: () => {
    let d = new Date();
    // convert to msec since Jan 1 1970
    let localTime = d.getTime();
    // obtain local UTC offset and convert to msec
    let localOffset = d.getTimezoneOffset() * 60000;
    // obtain UTC time in msec
    let utc = localTime + localOffset;
    // obtain and add destination’s UTC time offset
    // for example, Bombay
    // which is UTC + 5.5 hours
    let offset = -4;
    let est = utc + 3600000 * offset;
    // convert msec value to date string
    let nd = new Date(est);

    return nd.getFullYear() + "-" + (nd.getMonth() + 1) + "-" + nd.getDate();
  },
};

export const dateToString = (date, format) => {
  // %y - year
  // %m - month
  // %d - day
  // %H - Hour
  // %M - Minute
  // %S - Second

  // look for %y
  if (format.includes("%y")) {
    var a = date.getFullYear();
    format = format.replace("%y", a);
  }
  // look for %m
  if (format.includes("%m")) {
    var a = date.getMonth() + 1;
    a = a < 10 ? "0" + a : a;
    format = format.replace("%m", a);
  }
  // look for %d
  if (format.includes("%d")) {
    var a = date.getDate();
    a = a < 10 ? "0" + a : a;
    format = format.replace("%d", a);
  }
  // look for %H
  if (format.includes("%H")) {
    var a = date.getHours();
    a = a < 10 ? "0" + a : a;
    format = format.replace("%H", a);
  }
  // look for %M
  if (format.includes("%M")) {
    var a = date.getMinutes();
    a = a < 10 ? "0" + a : a;
    format = format.replace("%M", a);
  }
  // look for %S
  if (format.includes("%S")) {
    var a = date.getSeconds();
    a = a < 10 ? "0" + a : a;
    format = format.replace("%S", a);
  }
  return format;
};

export const stringToDateTime = (str, initial) => {
  /*
  today
  tomorrow
  yesterday
  n days before
  n days later
  n month before 
  n month later
  beginning week
  beginning month
  no time
  */
  let date = initial ? new Date(initial) : new Date();
  let allArgs = str.split(" & ");

  for (let a of allArgs) {
    let args = a.split(" ");

    if (args.includes("today")) {
      // changes nothing *
    }
    if (args.includes("tomorrow")) {
      date.setDate(date.getDate() + 1);
    }

    if (args.includes("beginning")) {
      if (args[1] === "week") date.setDate(date.getDate() - date.getDay());
      if (args[1] === "month") date.setDate(1);
    }

    if (args[1] === "days") {
      date.setDate(args[2] === "before" ? date.getDate() - parseInt(args[0]) : args[2] === "later" ? date.setDate(date.getDate() + parseInt(args[0])) : date.getDate());
    }
    if (args[1] === "month") {
      date.setMonth(args[2] === "before" ? date.getMonth() - parseInt(args[0]) : args[2] === "later" ? date.setDate(date.getMonth() + parseInt(args[0])) : date.getMonth());
    }

    if (args[0] === "no") {
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
    }
  }

  return date;
};

export const getName = (id, list) => {
  for (let l of list) {
    if (l.id === id) return l.name;
  }
  return "";
};

export const getFullName = (id, names) => {
  for (let name of names) {
    if (name.id === id) return name.first_name + " " + name.last_name;
  }
  return "";
};

export const getUsername = (id, names) => {
  for (let name of names) {
    if (name.id === id) return name.username;
  }
  return "";
};

export const getNumber = (id, names) => {
  for (let name of names) {
    if (name.id === id) return name.number;
  }
  return "";
};

export const getChoice = (choice, choices) => {
  let found = "*not found";
  Object.keys(choices).forEach((ch) => {
    if (ch === choice) {
      found = choices[ch];
    }
  });
  return found;
};

export const findAndGet = (item, value, items) => {
  for (let i of items) {
    if (i[item] === value) return i;
  }
  return false;
};

export const fixDate = (dateTime) => {
  const time = new Date(dateTime);
  return time.toLocaleDateString() + " - " + time.toLocaleTimeString();
};

export const getDuration = (ts1, ts2, string = "") => {
  // %s - seconds
  // %m - minutes
  // %h - hours
  // %D - Days
  // %M - Month
  // %Y - Years

  if (!ts1 || !ts2) return "no data provided";
  const t1 = new Date(ts1);
  const t2 = new Date(ts2);

  let milleseconds = Math.abs(t2.getTime() - t1.getTime());

  let years = Math.floor(milleseconds / 31104000000);
  if (string.includes("%Y")) {
    string = string.replace("%Y", years);
    milleseconds -= years * 31104000000;
  }
  let month = Math.floor(milleseconds / 2592000000);
  if (string.includes("%M")) {
    string = string.replace("%M", month);
    milleseconds -= month * 2592000000;
  }
  let days = Math.floor(milleseconds / 86400000);
  if (string.includes("%D")) {
    string = string.replace("%D", days);
    milleseconds -= days * 86400000;
  }
  let hours = Math.floor(milleseconds / 3600000);
  if (string.includes("%h")) {
    string = string.replace("%h", hours);
    milleseconds -= hours * 3600000;
  }
  let minutes = Math.floor(milleseconds / 60000);
  if (string.includes("%m")) {
    string = string.replace("%m", minutes);
    milleseconds -= minutes * 60000;
  }
  let seconds = Math.floor(milleseconds / 1000);
  if (string.includes("%s")) {
    string = string.replace("%s", seconds);
    milleseconds -= seconds * 1000;
  }

  console.log(string);
  return string;
};

export const is_updated = (index, data, attr) => {
  return index != 0 && data[index - 1][attr] != data[index][attr];
};

export const sort = (data, sort_order = []) => {
  // {
  // column: 'status',
  // type: 'str' 'int'
  // ascending: true
  // }
  for (let so of sort_order) {
    data = [...data].sort((a, b) => {
      if (so.ascending ? a[so.column] > b[so.column] : a[so.column] < b[so.column]) return 1;
      if (so.ascending ? a[so.column] < b[so.column] : a[so.column] > b[so.column]) return -1;
      return 0;
    });
  }
  return data;
};
