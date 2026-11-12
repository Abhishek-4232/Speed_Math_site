export type Drill = 'addition'|'subtraction'|'multiplication'|'division'|'bodmas'|'squares'|'cubes'|'tables'|'square-roots'|'cube-roots'|'exponents'|'exponent-roots'|'fraction-percent'|'percent-fraction'|'column-addition'|'mixed';
export const drills: {id:Drill;name:string;symbol:string;description:string}[] = [
{id:'addition',name:'Addition',symbol:'+',description:'Add numbers quickly'}, {id:'subtraction',name:'Subtraction',symbol:'−',description:'Build subtraction speed'}, {id:'multiplication',name:'Multiplication',symbol:'×',description:'Multiply with confidence'}, {id:'division',name:'Division',symbol:'÷',description:'Exact division drills'}, {id:'bodmas',name:'BODMAS',symbol:'()',description:'Order of operations'}, {id:'squares',name:'Squares',symbol:'x²',description:'Recall perfect squares'}, {id:'cubes',name:'Cubes',symbol:'x³',description:'Recall perfect cubes'}, {id:'tables',name:'Tables',symbol:'⊞',description:'Master multiplication tables'}, {id:'square-roots',name:'Square roots',symbol:'√',description:'Recognise perfect roots'}, {id:'cube-roots',name:'Cube roots',symbol:'∛',description:'Find cube roots'}, {id:'exponents',name:'Exponents',symbol:'aⁿ',description:'Evaluate powers'}, {id:'exponent-roots',name:'Find the base',symbol:'ⁿ√',description:'Reverse exponent questions'}, {id:'fraction-percent',name:'Fraction of %',symbol:'%',description:'Find percentages of fractions'}, {id:'percent-fraction',name:'% to fraction',symbol:'½',description:'Convert percentages to fractions'}, {id:'column-addition',name:'Column addition',symbol:'Σ',description:'Add several values'}, {id:'mixed',name:'Mixed challenge',symbol:'✦',description:'All-round number practice'}];
export type Question={id:string;prompt:string;answer:number;explanation:string};
export type Difficulty='easy'|'moderate'|'tough';
export type RNG=()=>number;
export function seededRandom(seed:number):RNG {let state=seed>>>0;return ()=>{state=(1664525*state+1013904223)>>>0;return state/4294967296;};}
const rand=(rng:RNG,min:number,max:number)=>Math.floor(rng()*(max-min+1))+min;
export type GeneratorOptions={digits?:number;terms?:number};
export function generateQuestion(drill:Drill,difficulty:Difficulty='easy',rng:RNG=Math.random,options:GeneratorOptions={}):Question {
 const defaultCap=difficulty==='easy'?12:difficulty==='moderate'?35:100;
 const digitCap=options.digits?10**Math.max(1,Math.min(5,options.digits))-1:defaultCap;
 const cap=Math.max(9,Math.min(99999,digitCap));
 const a=rand(rng,2,cap),b=rand(rng,2,cap);
 let prompt='',answer=0,explanation='';
 const selected=drill==='mixed'?drills[rand(rng,0,14)].id:drill;
 switch(selected){
 case 'addition':{const terms=Math.max(2,Math.min(10,options.terms??2));const values=[a,b,...Array.from({length:terms-2},()=>rand(rng,1,cap))];prompt=values.join(' + ');answer=values.reduce((x,y)=>x+y,0);break;}
 case 'subtraction':prompt=`${a+b} − ${a}`;answer=b;break;
 case 'multiplication':case 'tables':prompt=`${a} × ${b}`;answer=a*b;break;
 case 'division':prompt=`${a*b} ÷ ${a}`;answer=b;break;
 case 'bodmas':prompt=`${a} + ${b} × 2`;answer=a+b*2;break;
 case 'squares':prompt=`${a}²`;answer=a*a;break;
 case 'cubes':{const n=rand(rng,2,Math.min(cap,99999));prompt=`${n}³`;answer=n**3;break;}
 case 'square-roots':prompt=`√${a*a}`;answer=a;break;
 case 'cube-roots':{const n=rand(rng,2,Math.min(cap,99999));prompt=`∛${n**3}`;answer=n;break;}
 case 'exponents':{const exp=rand(rng,2,3);prompt=`${a}^${exp}`;answer=a**exp;break;}
 case 'exponent-roots':{const exp=rand(rng,2,3);prompt=`Find x: x^${exp} = ${a**exp}`;answer=a;break;}
 case 'fraction-percent':{const percent=rand(rng,1,10)*10;prompt=`${percent}% of ${a*10}`;answer=percent*a/10;break;}
 case 'percent-fraction':{const pct=rand(rng,1,100);prompt=`Convert ${pct}% to a fraction (or decimal)`;answer=pct/100;break;}
 case 'column-addition':{const terms=Math.max(2,Math.min(10,options.terms??3));const values=[a,b,...Array.from({length:terms-2},()=>rand(rng,1,cap))];prompt=values.join(' + ');answer=values.reduce((x,y)=>x+y,0);break;}
 default:prompt=`${a} + ${b}`;answer=a+b;
 }
 explanation=`${prompt} = ${answer}`;
 return {id:`${selected}-${prompt}`,prompt,answer,explanation};
}
export function generateSet(drill:Drill,difficulty:Difficulty,count:number,seed:number,options:GeneratorOptions={}):Question[]{
 if(!Number.isInteger(count)||count<1||count>100)throw new Error('Question count must be between 1 and 100');
 const rng=seededRandom(seed);const results:Question[]=[];const seen=new Set<string>();
 for(let i=0;i<count;i++){let q:Question;let tries=0;do{q=generateQuestion(drill,difficulty,rng,options);tries++;}while(seen.has(q.id)&&tries<300);if(seen.has(q.id)){q={...q,id:`${q.id}-repeat-${i+1}`};}seen.add(q.id);results.push(q);}
 return results;
}
export function grade(question:Question,input:string):boolean {const raw=input.trim().replace(/,/g,'');if(raw==='')return false;let n=Number(raw);if(raw.includes('/')){const parts=raw.split('/');if(parts.length!==2)return false;const numerator=Number(parts[0].trim()),denominator=Number(parts[1].trim());if(!Number.isFinite(numerator)||!Number.isFinite(denominator)||denominator===0)return false;n=numerator/denominator;}return Number.isFinite(n)&&Math.abs(n-question.answer)<1e-9;}
