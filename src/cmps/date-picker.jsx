import { DatePicker } from "antd"
import moment from "moment";
export function DatePickerCmp() {

    const dateFormat = "MM-DD-YYYY";
    // const startDate = (searchDetails.checkIn && searchDetails.checkIn !== 'flexible') ? (dayjs(searchDetails.checkIn)) : dayjs("02-01-2023")
    // const endDate = (searchDetails.checkOut && searchDetails.checkOut !== 'flexible') ? (dayjs(searchDetails.checkOut)) : dayjs("02-06-2023")

    return <div className="date-picker"><DatePicker popupClassName='details-date-picker'
        format={dateFormat}
        // defaultValue={[startDate, endDate]}
        // defaultValue={}
        onChange={(values) => {
            const value1 = moment(values[0]).format('DD-MM-YYYY')
            const time1 = values[0].$d
            const date = new Date(time1)
            const day = 1000 * 60 * 60 * 24

            //    const dateStart = date.getTime()
            // const dateStart = values[0].$d.getTime()
            // const dateEnd = values[1].$d.getTime()
            // const daysCount = Math.round((dateEnd - dateStart) / (day))

            // const totalPrice = daysCount * stay.price
            // setSelectedRange(dates.map((date) => dayjs(date).format(dateFormat)))
            // setOrder({ ...order, totalPrice: totalPrice, startDate: values[0].$d, endDate: values[1].$d, totalNights: daysCount })
        }} />
    </div >
}
