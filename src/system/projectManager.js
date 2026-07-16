// MAGI OS
// Project Manager v0.2.0

let activeProject = null;
let listeners = [];

function notify() {
  listeners.forEach((listener) => {
    listener(activeProject);
  });
}

export function openProject(project) {
  if (!project) {
    return;
  }

  activeProject = project;
  notify();
}

export function closeProject() {
  activeProject = null;
  notify();
}

export function getActiveProject() {
  return activeProject;
}

export function subscribeToProject(callback) {
  listeners.push(callback);

  callback(activeProject);

  return () => {
    listeners = listeners.filter(
      (listener) => listener !== callback
    );
  };
}