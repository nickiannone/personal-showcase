import { useState } from "react";

const DateRange = (props) => {
    const [startDate, setStartDate] = useState(props.startDate);
    const [endDate, setEndDate] = useState(props.endDate);
    const onChange = props.onChange;

    // TODO Rethink how this interacts with other date ranges?

    const onStartDateChange = (event) => {
        setStartDate(event.target.value);
        // Adjust end date if it's earlier!
        if (endDate && endDate < event.target.value) {
            setEndDate(event.target.value);
        }
    };

    const onEndDateChange = (event) => {
        setEndDate(event.target.value);
        // Adjust start date if it's later!
        if (startDate && startDate > event.target.value) {
            setStartDate(event.target.value);
        }
    };

    const clearFields = () => {
        setStartDate(null);
        setEndDate(null);
    };

    const handleSave = () => {
        // TODO Validate!
        onChange({
            startDate: startDate,
            endDate: endDate
        });
    }

    return (
        <div className="date-range-wrapper">
            <label>
                Start Date:
                <input type="date" id="start-date" value={startDate} onChange={onStartDateChange} />
            </label>
            
            <label>
                End Date:
                <input type="date" id="end-date" value={endDate} onChange={onEndDateChange} />
            </label>
            
            <button type="reset" onClick={clearFields}>Clear</button>
            <button type="submit" onClick={handleSave}>Save</button>
        </div>
    )
};

export default DateRange;