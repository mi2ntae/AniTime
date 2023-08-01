const reservedInfo = {
  reservedDate: new Date(),
  reservedTime: "",
};

function reducer(state = reservedInfo, action) {
  switch (action.type) {
    case "SUBMIT_TIME":
      return {
        reservedDate: action.date,
        reservedTime: action.time,
      };
    default:
      return state;
  }
}
