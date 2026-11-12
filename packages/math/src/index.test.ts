import {describe,it,expect} from 'vitest';
import {drills,generateSet,generateQuestion,grade,seededRandom} from './index';

describe('question generator',()=>{
  it('generates all 16 drill types with numeric, gradeable answers',()=>{
    for(const drill of drills){
      const q=generateQuestion(drill.id,'moderate',seededRandom(123));
      expect(q.prompt.length).toBeGreaterThan(0);
      expect(Number.isFinite(q.answer)).toBe(true);
      expect(grade(q,String(q.answer))).toBe(true);
    }
  });
  it('generates deterministic sets with unique question identifiers',()=>{
    const a=generateSet('addition','easy',10,42),b=generateSet('addition','easy',10,42);
    expect(a).toEqual(b);
    expect(new Set(a.map(q=>q.id)).size).toBe(10);
  });
  it('supports a full 100-question set even for small digit ranges',()=>{
    for(const drill of drills){
      const set=generateSet(drill.id,'easy',100,123,{digits:1,terms:2});
      expect(set).toHaveLength(100);
      expect(set.every(q=>Number.isFinite(q.answer))).toBe(true);
      expect(new Set(set.map(q=>q.id)).size).toBe(100);
    }
  });
  it('rejects empty, invalid and incorrect answers',()=>{
    const q=generateQuestion('addition','easy',seededRandom(1));
    expect(grade(q,'')).toBe(false);
    expect(grade(q,'hello')).toBe(false);
    expect(grade(q,String(q.answer+1))).toBe(false);
    expect(grade(q,'1/0')).toBe(false);
  });
  it('accepts equivalent fraction answers exactly',()=>{
    const q={id:'fraction',prompt:'Convert 25% to a fraction',answer:0.25,explanation:'1/4'};
    expect(grade(q,'1/4')).toBe(true);
    expect(grade(q,'2/8')).toBe(true);
    expect(grade(q,'0.25')).toBe(true);
    expect(grade(q,'1/3')).toBe(false);
  });
  it('generates exact divisions',()=>{
    for(let i=0;i<100;i++){
      const q=generateQuestion('division','tough',seededRandom(i));
      expect(Number.isInteger(q.answer)).toBe(true);
    }
  });
});

describe('generator configuration',()=>{
  it('respects digit complexity for addition operands',()=>{
    const q=generateQuestion('addition','tough',seededRandom(9),{digits:1});
    expect(q.prompt.split(' + ').every(n=>Number(n)<=9)).toBe(true);
  });
  it('supports configurable addition term counts',()=>{
    const q=generateQuestion('addition','moderate',seededRandom(11),{digits:2,terms:6});
    expect(q.prompt.split(' + ')).toHaveLength(6);
    expect(grade(q,String(q.answer))).toBe(true);
  });
  it('supports up to ten column-addition terms',()=>{
    const q=generateQuestion('column-addition','easy',seededRandom(3),{digits:2,terms:10});
    expect(q.prompt.split(' + ')).toHaveLength(10);
    expect(grade(q,String(q.answer))).toBe(true);
  });
});
