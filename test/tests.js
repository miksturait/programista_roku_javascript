import { expect } from 'chai';
import { describe, it } from 'mocha';

import gameOfLife from '../index.js';

describe("Game of Life", function () {

  it("return collection of live cells coordinates for 5th and 6th generation", function(){
   let word_size = 20,
      live_cells_coordinates = [[10,11],[11,11],[12,11]],
      requested_generations = [5,6];

    expect(gameOfLife(word_size, live_cells_coordinates, requested_generations))
        .to.eq([[[11,10], [11,11], [11,12]], [[10,11],[11,11],[12,11]]]);
  });
});
