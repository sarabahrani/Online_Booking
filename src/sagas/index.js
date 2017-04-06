import { put, fork, takeLatest } from 'redux-saga/effects';
const clientUrl = `http://localhost:53364/api/client/1`;
const appointmentUrl = 'http://localhost:53364/api/appointment/';
function fetchUrlData(url) {
    return fetch(url, {
        method: 'get',
        dataType: 'json',
        headers: {
            'Accept': 'application/json',
            'contentType': 'application/json',
            'request-mode': 'no-cors',
        }
    }).then(statusHelper)
        .then(response => response.json());
}
function postData(url, data) {
    return fetch(url, {
        method: 'post',
        dataType: 'json',
        headers: {
            'Accept': 'application/json',
            'contentType': 'application/json',
            'request-mode': 'no-cors',
        },
        body: JSON.stringify(
            {
                fullName: data.fullName,
                phone: data.phone,
                email: data.email,
                weekReminder: data.weekReminder,
                dayReminder: data.dayReminder,
                hourReminder: data.hourReminder,
                id: 45,
            }
        )
    }).then(statusHelper)
    .then(response => response.json());
}
function statusHelper(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}
function* loadClientSetting(clientId) {
    try {
        const clientInfo = yield fetchUrlData(clientUrl);
        yield put({ type: 'LOAD_CLIENT_SETTING_SUCCEED', clientInfo });

    } catch (e) {
        yield put({ type: 'LOAD_CLIENT_SETTING_FAILED', message: e.message });
    }
}
function* loadAppointments(clientId, firstDayOfWeek) {
    try {
        let appointment = yield fetchUrlData(appointmentUrl);
        appointment = appointment.data;
        yield put({ type: 'LOAD_APPOINTMENTS_SUCCEED', appointment });
    } catch (e) {
        yield put({ type: 'LOAD_APPOINTMENTS_FAILED', message: e.message });
    }
}
function* appointmentSubmit(data) {
    try {
        let msg = yield postData(appointmentUrl,data );
         yield put({ type: 'APPOINTMENT_SUBMIT_SUCCEED',msg});
    } catch (e) {
        yield put({ type: 'APPOINTMENT_SUBMIT_FAILED',message:e.message});
    }
}
function* rootSaga() {
    yield fork(takeLatest, 'LOAD_CLIENT_SETTING', loadClientSetting);
    yield fork(takeLatest, 'LOAD_APPOINTMENTS', loadAppointments);
    yield fork(takeLatest, 'APPOINTMENT_SUBMIT', appointmentSubmit);
}
export default rootSaga;
