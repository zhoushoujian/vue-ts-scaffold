export function setTempLocation() {
  const location = window.location.href;
  if (!location.includes('/login')) {
    localStorage.setItem('tempLocation', location);
  }
}
