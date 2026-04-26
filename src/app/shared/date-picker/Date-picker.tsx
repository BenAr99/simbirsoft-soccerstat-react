import React, {type ReactElement, useRef} from "react";
import './Date-picker.scss'


type Props = {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
};

const DatePicker = ({
                        value,
                        onChange,
                        disabled = false,
                    }: Props): ReactElement => {
    const hiddenInputRef = useRef<HTMLInputElement>(null);

    const openPicker = (): void => {
        hiddenInputRef.current?.showPicker?.();
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        onChange(e.target.value || "");
    };

    const formattedDate = value
        ? new Date(value).toLocaleDateString("ru-RU")
        : "";

    return (
        <div className='date-picker__container' onClick={openPicker}>
            <input
                className='date-picker__hidden'
                ref={hiddenInputRef}
                type="date"
                value={value}
                onChange={handleChange}
                disabled={disabled}
            />

            <input
                className='date-picker'
                type="text"
                value={formattedDate}
                readOnly
            />
            <img alt="Изображение календаря" src="/public/icons/date-picker.svg"/>

        </div>
    );
};

export default DatePicker;