import { expect } from 'chai';
import {describe, it} from 'mocha';

import fibonacci from '../index.js'

describe("Fibonacci", function(){

  it('return 0 for 0', function(){
    expect( fibonacci(0)).to.eq(0);
  });

  it('return 1 for 1', function(){
    expect( fibonacci(1)).to.eq(1);
  });

  it('return 144 for 12', function(){
    expect( fibonacci(12)).to.eq(144);
  });
});
