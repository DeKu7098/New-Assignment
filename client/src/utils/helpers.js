import moment from "moment";

export const getAntdFormRules = [
  {
    required: true,
    message: "Required",
  },
];


export const getDateFormat = (date) => {
 return moment(date).format("MMMM Do YYYY, h:mm A")
}