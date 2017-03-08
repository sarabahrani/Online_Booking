import { put, takeLatest, fork } from 'redux-saga/effects';
function* loadClientSetting(clientId) {
    try {
        const workHour =
            {
                startHour: new Date(2017, 1, 1, 10, 0, 0),
                endHour: new Date(2017, 1, 1, 16, 30, 0),
                stepMinute: 30,
            }
        yield put({ type: 'LOAD_CLIENT_SETTING_SUCCEED', workHour });

    } catch (e) {
        yield put({ type: 'LOAD_CLIENT_SETTING_FAILED', message: e.message });
    }
}
function* loadAppointments(clientId, firstDayOfWeek) {
    try {
        const appointment = [{
            person: {
                fullName: 'sara',
                phone: '7786819914',
                email: 'sara.bahrani@gmail.com',
                week: true,
                
            },
            startDate: new Date(2017, 2, 5, 10, 30),
            endDate: new Date(2017, 2, 5, 11),
        },
        {
            person: {
                fullName: 'iman',
                phone: '778456844',
                email: 'iman.@gmail.com',
                day: true,
              
            },
            startDate: new Date(2017, 2, 7, 11),
            endDate: new Date(2017, 2, 7, 11, 30),
        },];
        yield put({ type: 'LOAD_APPOINTMENTS_SUCCEED', appointment });

    } catch (e) {
        yield put({ type: 'LOAD_APPOINTMENTS_FAILED', message: e.message });
    }
}
function* rootSaga() {
    yield fork(takeLatest, 'LOAD_CLIENT_SETTING', loadClientSetting);
    yield fork(takeLatest, 'LOAD_APPOINTMENTS', loadAppointments);
}
export default rootSaga;
