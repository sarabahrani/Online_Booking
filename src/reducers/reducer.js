
function utcToLocal(time) {
    let t = new Date(time);
    //getTimezoneOffset() : return the defernence in minutes between local time and UTC and multiple to 60000 to change it to milisecond
    //getTime(): get the time value in milisecond 
    t = new Date(t.getTime() + (t.getTimezoneOffset() * 60000));
    return t;
}
export default function form(state = {}, action) {
    switch (action.type) {
        case 'FORM':
            return {
                ...state,
                [action.name]: action.value,
            };
        case 'LOAD_CLIENT_SETTING_SUCCEED':
            /* To change the ISO datetime to UTC. */
            const { startHour, endHour, ...otherInfo } = action.clientInfo;
            return {
                ...state,
                clientInfo: { startHour:utcToLocal(startHour), endHour: utcToLocal(endHour), ...otherInfo },
            };
        case 'LOAD_CLIENT_SETTING_FAILED':
            return {
                ...state,
                message: action.message,
            };
        case 'LOAD_APPOINTMENTS_SUCCEED':
            const p = action.appointment.map((p) => {
                return { ...p, date: utcToLocal(p.date) };
            });
            return {
                ...state,
                appointment: p,
            };
        case 'LOAD_APPOINTMENTS_FAILED':
            return {
                ...state,
                message: action.message,
            };
        case 'SET_APPOINTMENT':
            return {
                ...state,
                FullName: action.selectedData && action.selectedData.fullName,
                Phone: action.selectedData && action.selectedData.phone,
                Email: action.selectedData && action.selectedData.email,
                week: action.selectedData && action.selectedData.weekReminder,
                day: action.selectedData && action.selectedData.dayReminder,
                hour: action.selectedData && action.selectedData.hourReminder,
            };
        default:
            return state;
    }

}