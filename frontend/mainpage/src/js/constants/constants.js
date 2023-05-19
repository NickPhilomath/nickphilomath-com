export const TOKEN_URL = "/api/token/";
export const REFRESH_URL = "/api/token/refresh";

export const DRIVERS_URL = "/api/drivers/";
export const DRIVERS_PROGRESS_URL = "/api/drivers/progress";
export const DRIVERS_LIST_URL = "/api/drivers/?list=True";

export const USERS_URL = "/api/users/";
export const USERS_LIST_URL = "/api/users/?list=True";
export const DISPATCHERS_LIST_URL = "/api/users/?list=True&filter=DIS";

export const ASSETS_URL = "api/assets/";

export const CARRIERS_URL = "/api/carriers/";
export const CARRIERS_LIST_URL = "/api/carriers/?list=True";

export const LOADS_URL = "/api/loads/";

export const TRAILERS_URL = "/api/assets/trailers/";

// export const DEFAULT_PAGE = "/assets/?view=0";
export const DEFAULT_PAGE = "/overview";

export const ROLES = {
  Owner: "OWN",
  Dispatcher: "DIS",
  Updater: "UPD",
  Fleet_manager: "FLM",
  Safety_manager: "SAM",
  Accountant: "ACC",
  Developer: "DEV",
  Guest: "GUE",
};

export const USER_ROLES = {
  // OWN: "Owner",
  OWN: "Owner",
  DIS: "Dispatcher",
  UPD: "Updater",
  FLM: "Fleet manager",
  SAM: "Safety manager",
  ACC: "Accountant",
  DEV: "Developer",
  GUE: "Guest",
};

export const ACTIVITY_RANGE = {
  r1: "last week",
  r2: "this week",
  r3: "last month",
  r4: "this month",
};

export const DRIVER_TYPE = {
  O88: "Owner operator - 88%",
  O85: "Owner operator - 85%",
  C30: "Company driver - 30%",
  C35: "Company driver - 35%",
  L: "Lease operator",
  R: "Rental operator",
};

export const DRIVER_STATUS = {
  rea: "Ready",
  cov: "Covered",
  pre: "Prebooked",
  hom: "Home",
  enr: "Enroute",
  hol: "Holiday",
  res: "Rest",
  ina: "Inactive",
};

export const DRIVER_STATUS_COLOR = {
  rea: "rgb(247, 79, 79)",
  cov: "rgb(15, 148, 0)",
  pre: "rgb(227, 227, 82)",
  hom: "rgb(56, 122, 235)",
  enr: "rgb(56, 235, 119)",
  hol: "rgb(97, 97, 97)",
  res: "rgb(247, 176, 52)",
  ina: "rgb(189, 189, 189)",
};

export const TRAILER_STATUS = {
  ius: "In use",
  uns: "Unused",
  rep: "Repairing",
};

export const TRAILER_LOG_STATUS = {
  m: "move",
  s: "stop",
};

export const TRAILER_LOG_STATUS_COLOR = {
  m: "#00c94a",
  s: "#ff696e",
};

export const BUDGET_TYPE = {
  D: "Driver's budget",
  L: "Lane budget",
  R: "Recovery budget",
};

export const LOAD_STATUS = {
  CO: "Covered",
  SO: "Sold",
  TO: "Tonu",
  RJ: "Rejected",
  RM: "Removed",
};

export const STATES = {
  AK: "Alaska",
  AL: "Alabama",
  AR: "Arkansas",
  AS: "American Samoa",
  AZ: "Arizona",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DC: "District of Columbia",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  GU: "Guam",
  HI: "Hawaii",
  IA: "Iowa",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  MA: "Massachusetts",
  MD: "Maryland",
  ME: "Maine",
  MI: "Michigan",
  MN: "Minnesota",
  MO: "Missouri",
  MS: "Mississippi",
  MT: "Montana",
  NC: "North Carolina",
  ND: "North Dakota",
  NE: "Nebraska",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NV: "Nevada",
  NY: "New York",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  PR: "Puerto Rico",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VA: "Virginia",
  VI: "Virgin Islands",
  VT: "Vermont",
  WA: "Washington",
  WI: "Wisconsin",
  WV: "West Virginia",
  WY: "Wyoming",
};
