var moment = require('moment');

export class DateFormatValueConverter {
  toView(date) {
    return moment(date).format('Do MMMM YYYY, h:mm a')
  }

  fromView(value) {
    //
  }
}
