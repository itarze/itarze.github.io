const entryLog = [];
export const logCommand = (kbAddr, request, response) => {
  entryLog.push({kbAddr, request, response, ts: Date.now()});
};
export const getLog = window.__getLogs = () => {
  return entryLog;
};
window.addEventListener("message", (m) => {
  console.log("cl", m);
  if (m.data.command === "fetchLogs") {
    window.postMessage({command: "getLogs", payload: getLog()}, "*");
  }
});
