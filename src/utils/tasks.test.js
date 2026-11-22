import test from 'node:test';import assert from 'node:assert/strict';import {taskStatus,metrics,addDays,validateImport} from './tasks.js';
const base={id:'1',title:'Example',description:'',category:'General',priority:'High',createdAt:'2026-01-01T00:00:00Z',dueDate:'2026-02-10',status:'pending',completedAt:null};
test('status classifications',()=>{assert.equal(taskStatus(base,'2026-02-11'),'Overdue');assert.equal(taskStatus(base,'2026-02-10'),'Due Today');assert.equal(taskStatus(base,'2026-02-09'),'Upcoming');assert.equal(taskStatus({...base,dueDate:''},'2026-02-11'),'No Due Date');assert.equal(taskStatus({...base,status:'completed'},'2026-02-11'),'Completed')});
test('metrics do not count completed overdue',()=>{assert.deepEqual(metrics([base,{...base,id:'2',status:'completed'}],'2026-02-11'),{total:2,completed:1,pending:1,overdue:1,dueToday:0,upcoming:0,completion:50})});
test('local calendar date addition',()=>assert.equal(addDays('2026-12-31',1),'2027-01-01'));
test('import repairs duplicate ids',()=>{const rows=validateImport([base,base]);assert.notEqual(rows[0].id,rows[1].id)});
test('import rejects bad rows',()=>assert.throws(()=>validateImport([{...base,priority:'Extreme'}])));
