import { expect } from 'chai';
import {describe, it} from 'mocha';

import {toRoman, toDecimal} from '../index.js';

describe("Years in Roman Times", function(){
  describe("from Decimal to Roman", function() {
    it('return "X" for 10', function(){
      expect( toRoman(10)).to.eq('X');
    });

    it('return "V" for 5', function(){
      expect( toRoman(5)).to.eq('V');
    });
  });

  describe("from Roman to Decimal", function(){
    it('return 1 for "I"', function(){
      expect( toDecimal('I')).to.eq(1);
    });

    it('return 50 for "L"', function(){
      expect( toDecimal('L')).to.eq(50);
    });
  });
});
