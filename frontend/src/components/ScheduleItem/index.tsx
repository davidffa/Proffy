import React from 'react';

import convertMinutesToHours from '../../utils/convertMinutesToHours';

import './styles.css';

interface ScheduleItemProps {
    day: string;
    from: string;
    to: string;
}

const ScheduleItem: React.FC<ScheduleItemProps> = ({ day, from, to }) => {
    if (from && to) {
        return (
            <div className="schedule-item">
                    <span>Dia</span>
                    <strong>{day}</strong>
                    <br />
                    <span>Horário</span>
                    <strong>{convertMinutesToHours(from)}h - {convertMinutesToHours(to)}h</strong>
                </div>
        )
    }else {
        return (
            <div className="empty-schedule-item">
                <span>Dia</span>
                <strong>{day}</strong>
                <br />
                <span>Horário</span>
                <strong> - </strong>
            </div>
        );
    }
}

export default ScheduleItem;