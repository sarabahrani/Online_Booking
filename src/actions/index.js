export function loadClientSetting(clientId) {
  return {
    type: 'LOAD_CLIENT_SETTING',
    clientId,
  };
}
export function loadAppointments(clientId, firstDayOfWeek) {
  return {
    type: 'LOAD_APPOINTMENTS',
    clientId,
    firstDayOfWeek,
  };
}
export function setAppointment(selectedData) {
  return {
    type: 'SET_APPOINTMENT',
    selectedData,
  };
}
export function appointmentSubmit(data) {
  return {
    type: 'APPOINTMENT_SUBMIT',
    data,
  };
}
