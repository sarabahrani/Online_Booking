export function onBlur(name, value) {
  return {
    type: 'BLUR',
    name,
    value,
  };
}
export function emailNotification(checked, name) {
  return {
    type: 'EMAIL_NOTIFICATION',
    checked,
    name,
  };
}
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
