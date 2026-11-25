const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const source=fs.readFileSync(__dirname+'/index.html','utf8').match(/<script>\s*([\s\S]*?)<\/script>/)[1];
const timers=[],nodes=new Map();const node=()=>({addEventListener(){},classList:{contains:()=>true,toggle(){}},children:[],style:{},append(){},innerHTML:''});
const ctx={console,document:{getElementById:id=>{if(!nodes.has(id))nodes.set(id,node());return nodes.get(id)}},setTimeout:fn=>timers.push(fn),window:{},confirm:()=>false};vm.createContext(ctx);vm.runInContext(source,ctx);
vm.runInContext(`
function empty(){return {board:Array.from({length:9},()=>Array(9).fill(null)),turn:'b',hands:{b:{},w:{}},over:''}}
let g=empty();g.board[3][4]={p:'歩',s:'b'};
if(sApply(g,{from:[4,3],to:[4,2],promote:false}).board[2][4].p!=='歩')throw Error('decline');
if(sApply(g,{from:[4,3],to:[4,2],promote:true}).board[2][4].p!=='と')throw Error('accept');
g=empty();g.board[2][4]={p:'飛',s:'b'};if(sApply(g,{from:[4,2],to:[4,3],promote:true}).board[3][4].p!=='龍')throw Error('leave zone');
g=empty();g.board[1][4]={p:'桂',s:'b'};if(sApply(g,{from:[4,1],to:[3,0],promote:false}).board[0][3].p!=='成桂')throw Error('mandatory');
if(!sCanPromote({p:'銀',s:'w'},5,6)||sCanPromote({p:'金',s:'w'},5,6))throw Error('white eligibility');
render=()=>{};endCheck=()=>{};scheduleCpu=()=>{};
currentGame='othello';game=initialOthello();history=[];
playOthelloMove(oMoves(game)[0]);if(!othelloAnimating)throw Error('not locked');
const state=JSON.stringify(game);oClick(0,0);if(state!==JSON.stringify(game))throw Error('input during flip');
if(!Object.values(flipSquares).every(s=>s==='B'))throw Error('target face');
`,ctx);
timers.shift()();vm.runInContext(`if(othelloAnimating||Object.keys(flipSquares).length)throw Error('not settled');playOthelloMove(oMoves(game)[0]);runId++;startGame=()=>{};othelloAnimating=false;flipSquares={};`,ctx);timers.shift()();
console.log('PASS: promotion choices, leaving zone, forced promotion, side rules, Othello lock and completion, stale callback');
