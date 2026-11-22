const TASKS_KEY='taskflow.tasks.v1',SETTINGS_KEY='taskflow.settings.v1';
export const storage={loadTasks(){try{const data=JSON.parse(localStorage.getItem(TASKS_KEY)||'[]');return Array.isArray(data)?data:[]}catch{return []}},saveTasks(tasks){localStorage.setItem(TASKS_KEY,JSON.stringify(tasks))},loadSettings(){try{return JSON.parse(localStorage.getItem(SETTINGS_KEY)||'{}')}catch{return {}}},saveSettings(settings){localStorage.setItem(SETTINGS_KEY,JSON.stringify(settings))}};
// Swap this adapter for Supabase later; keep all persistence behind this interface.
