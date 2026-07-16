// MAGI OS
// Window Manager v0.1

let activeApp = null;
let listeners = [];

function notify() {
  listeners.forEach((listener) => listener(activeApp));
}

export function openApp(id) {
  activeApp = {
    id,
    openedAt: Date.now(),
    loading: true,
  };

  notify();
}

export function finishLoading() {
  if (!activeApp) return;

  activeApp = {
    ...activeApp,
    loading: false,
  };

  notify();
}

export function closeApp() {
  activeApp = null;
  notify();
}

export function getActiveApp() {
  return activeApp;
}

export function subscribe(callback) {
  listeners.push(callback);

  callback(activeApp);

  return () => {
    listeners = listeners.filter(
      (listener) => listener !== callback
    );
  };
}