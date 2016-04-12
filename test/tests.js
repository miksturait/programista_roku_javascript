import { expect } from 'chai';
import {describe, it} from 'mocha';

import fizFooBar from '../index.js';

describe("Fiz Foo Bar", function () {
   it("convert number to words", function() {
       expect(fizFooBar(21, [[3, 'Wat'], [7, 'Ho'], [21, 'Ho!']])).to.eq('WatHoHo!')
   });
});
