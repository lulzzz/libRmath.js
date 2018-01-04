const { abs, sign, trunc } = Math;

export const seq = (adjust = 0) => (adjustMin = adjust) => (
  start: number,
  end: number,
  step: number = 1
): number[] => {
  let s = start + adjust;
  let e = end + adjust;
  let cursor = s;
  if (end < start) {
    e = start + adjustMin;
    s = end + adjustMin;
    cursor = e;
  }

  step = abs(step) * sign(end - start);
  const rc = [];

  do {
    rc.push(cursor);
    cursor += step;
  } while (cursor >= s && cursor <= e && step !== 0);
  return rc;
};

export function selector(indexes: number|number[]): { (val: any, index: number): boolean} {
  const ind = forceToArray(indexes);
  return (val: any, idx: number) => {
    return ind.indexOf(idx) >= 0;
  };
}

export function flatten<T>(...rest: (T | T[])[]): T[] {
  let rc = [];
  for (const itm of rest) {
    if (Array.isArray(itm)) {
      let rc2 = flatten(...itm);
      rc.push(...rc2);
      continue;
    }
    rc.push(itm);
  }
  return rc;
}

export function arrayrify<T, R>(fn: (x: T, ...rest: any[]) => R) {
  return function(x: T | T[], ...rest: any[]): R | R[] {
    const fp = Array.isArray(x) ? x : [x];
    const result = fp.map(p => fn(p, ...rest));
    return result.length === 1 ? result[0] : result;
  };
}

export function forceToArray<T>(x: T | T[]): T[] {
  return Array.isArray(x) ? x : [x];
}

export function possibleScalar<T>(x: T[]): T | T[] {
  return x.length === 1 ? x[0] : x;
}

export function forEach<T>(xx: T): { (fn: (x: number) => number): number|number[] } {
  const fx: number[] = forceToArray(xx) as any;
  return function(fn: (x: number) => number): number | number[] {
    const result: number[] = fx.map(fn);
    return possibleScalar(result) as any;
  };
}

export function numberPrecision( prec: number= 6){

  function convert(x: number): number {
    if (isNaN(x)){
      return NaN;
    }
    return Number.parseFloat(x.toPrecision(prec));
  } 

  return arrayrify(convert);
}
