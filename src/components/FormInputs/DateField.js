import React, { InputHTMLAttributes, useEffect } from 'react';
import { useField } from 'formik';
import { CalendarDateFill } from "react-bootstrap-icons";
import DatePicker from 'react-datepicker';


const DateField = (props) => {
    const [field, { error, touched, value }, { setValue }] = useField(props);
    const {
        id, label, isrequired, notvalidate, maxDate, minDate, filterDate
    } = props;

    const validateClass = () => {
        if (touched && error) return 'is-invalid';
        if (notvalidate) return '';
        if (touched) return 'is-valid';

        return '';
    };

    const handleChangeAssignedDate = (assignDate) => {
        if(assignDate)
            assignDate.setHours(12,0);
        setValue(assignDate);
    };
    

    return (
        <>
            <div className="mb-3 row">
                <label className="col-4 col-form-label d-flex">
                    {label}
                    {isrequired && (
                        <div className="invalid ml-1">(*)</div>
                    )}
                </label>
                <div className="col">
                    <label className="border form-control d-flex align-items-center w-100" {...field}>
                        <DatePicker
                            id={id}
                            className="w-100 valid" {...field}
                            dateFormat="dd/MM/yyyy"
                            selected={(field.value && new Date(field.value)) || null }
                            onChange={date => handleChangeAssignedDate(date)}
                            isClearable
                            showYearDropdown
                            scrollableYearDropdown
                            yearDropdownItemNumber={25}
                            showMonthDropdown
                            maxDate={maxDate}
                            minDate={minDate}
                            filterDate={filterDate}
                            autoComplete="off"
                            onKeyDown={(e) => {
                                e.preventDefault();
                             }}
                        />

                        <div className="p-2" style={{justifyContent: "space-around"}}>
                            <CalendarDateFill cursor="pointer" />
                        </div>
                    </label>
                    {error && touched && (
                        <div className='invalid'>{error}</div>
                    )}
                </div>
            </div>
        </>
    );
};
export default DateField;