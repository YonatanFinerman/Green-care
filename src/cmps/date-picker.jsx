import { DatePicker } from "antd"
import moment from "moment";
export function DatePickerCmp({ setNewGatheringTime=null, newgatheringTime=null, setFilterBy=null, filterBy=null }) {

    const dateFormat = "DD/MM/YYYY";
    // const startDate = (searchDetails.checkIn && searchDetails.checkIn !== 'flexible') ? (dayjs(searchDetails.checkIn)) : dayjs("02-01-2023")
    // const endDate = (searchDetails.checkOut && searchDetails.checkOut !== 'flexible') ? (dayjs(searchDetails.checkOut)) : dayjs("02-06-2023")

    return <div className="date-picker"><DatePicker popupClassName='details-date-picker'
        format={dateFormat}
        disabledDate={(date) => {
            if (date.$d.getTime() < Date.now()) {
                return true
            }
            else {
                return false
            }
        }}
        // defaultValue={[startDate, endDate]}
        // defaultValue={moment(newgatheringTime)}
        onChange={(val) => {
            console.log(val, 'value')
            if (val) {
                // const value1 = moment(val).format('DD/MM/YYYY')
                // const time1 = val.$d
                // const date = new Date(time1)
                // const day = 1000 * 60 * 60 * 
                // var date = new Date(timestamp)
                // console.log(new Date(),'comeon')
                const date = val.$d
                date.setHours(0, 0, 0, 0)
                // console.log(date.getTime(),'val')
                if (filterBy) {
                    setFilterBy({ ...filterBy, date: date.getTime() })
                }
                else {
                    setNewGatheringTime({ ...newgatheringTime, date: date.getTime() })
                }
            }
            else {
                if (filterBy) {
                    setFilterBy({ ...filterBy, date: val })
                }
                else {

                    setNewGatheringTime({ ...newgatheringTime, date: val })
                }
            }

            //    const dateStart = date.getTime()
            // const dateStart = val[0].$d.getTime()
            // const dateEnd = val[1].$d.getTime()
            // const daysCount = Math.round((dateEnd - dateStart) / (day))

            // const totalPrice = daysCount * stay.price
            // setSelectedRange(dates.map((date) => dayjs(date).format(dateFormat)))
            // setOrder({ ...order, totalPrice: totalPrice, startDate: val[0].$d, endDate: val[1].$d, totalNights: daysCount })
        }} />
    </div >
}
