
export default function form(state = {}, action) {
    switch (action.type) {
        case 'BLUR':
            return {
                ...state,
                [action.name]: action.value,
            };
        case 'EMAIL_NOTIFICATION':
            return {
                ...state,
                [action.name]: action.checked,
            };
        case 'LOAD_CLIENT_SETTING_SUCCEED':
            return {
                ...state,
                workHour: action.workHour,
            };
        case 'LOAD_CLIENT_SETTING_FAILED':
            return {
                ...state,
                message: action.message,
            };
        case 'LOAD_APPOINTMENTS_SUCCEED':
            return {
                ...state,
                appointment: action.appointment,
            };
        case 'LOAD_APPOINTMENTS_FAILED':
            return {
                ...state,
                message: action.message,
            };
        case 'SET_APPOINTMENT':
            return {
                ...state,
                FullName: action.selectedData && action.selectedData.person.fullName,
                Phone: action.selectedData && action.selectedData.person.phone,
                Email: action.selectedData && action.selectedData.person.email,
            };
        default:
            return state;
    }

}