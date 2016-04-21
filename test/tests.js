import {expect} from 'chai';
import {describe, it} from 'mocha';
import {flatten, last, first} from 'lodash';
import gameOfLife from '../index';

// support function
// http://pmav.eu/stuff/javascript-game-of-life-v3.1.1
function parseToCoordinates(dataToParse) {
    return flatten(dataToParse.map(function (object) {
        return flatten(Object.keys(object).map((_x) => object[_x].map((_y) => [parseInt(_x), _y])))
    }));
}

describe("Game of Life", function () {
    let inputs = [
        [
            100,
            [{"10": [11]}, {"11": [11]}, {"12": [11]}],
            {
                "101": [{"11": [10, 11, 12]}],
                "102": [{"10": [11]}, {"11": [11]}, {"12": [11]}]
            }
        ],

        [
            99,
            [{"39": [10]}, {"40": [12]}, {"41": [9, 10, 13, 14, 15]}],
            {
                "10": [{"38": [10, 14, 15]}, {"39": [9, 10, 11, 13, 14, 16, 17]}, {"40": [8, 12, 16, 17]}, {"41": [9, 10, 11, 13, 15, 16]}, {"42": [10, 11, 12, 13, 14, 15, 16]}, {"43": [12, 13, 14]}]
            }
        ],
        [

           99,
            [{"9": [44]}, {"10": [42, 44]}, {"11": [32, 33, 40, 41, 54, 55]}, {"12": [31, 35, 40, 41, 54, 55]}, {"13": [20, 21, 30, 36, 40, 41]}, {"14": [20, 21, 30, 34, 36, 37, 42, 44]}, {"15": [30, 36, 44]}, {"16": [31, 35]}, {"17": [32, 33]}],

            {
                "50": [{"9": [46, 47]}, {"10": [45, 49]}, {"11": [29, 30, 44, 50, 54, 55]}, {"12": [29, 30, 44, 48, 50, 51, 54, 55]}, {"13": [20, 21, 25, 32, 33, 44, 50]}, {"14": [20, 22, 26, 32, 33, 34, 45, 49]}, {"15": [21, 22, 23, 24, 25, 32, 33, 46, 47]}, {"16": [22, 23, 24, 29, 30, 40, 42]}, {"17": [29, 30, 41, 42]}, {"18": [41]}, {"23": [48]}, {"24": [49, 50]}, {"25": [48, 49]}],
                "200": [{"9":[46,47]},{"10":[45,49]},{"11":[29,30,44,50,54,55]},{"12":[29,30,44,48,50,51,54,55]},{"13":[20,21,25,32,33,44,50]},{"14":[20,22,26,32,33,34,45,49]},{"15":[21,22,23,24,25,32,33,46,47]},{"16":[22,23,24,29,30,40,42]},{"17":[29,30,41,42]},{"18":[41]},{"23":[48]},{"24":[49,50]},{"25":[48,49]},{"31":[55,57]},{"32":[56,57]},{"33":[56]},{"38":[63]},{"39":[64,65]},{"40":[63,64]},{"46":[70,72]},{"47":[71,72]},{"48":[71]},{"53":[78]},{"54":[79,80]},{"55":[78,79]},{"61":[85,87]},{"62":[86,87]},{"63":[86]}]
            }
        ]
    ];

    it('should parse live_cells_coordinates', function () {
        let [word_size, live_cells_coordinates] = last(inputs);
        let data = parseToCoordinates(live_cells_coordinates);

        expect(first(data)).to.deep.equal([9, 44]);
        expect(last(data)).to.deep.equal([17, 33]);
    });


    inputs.forEach(function (input) {
        it(`return collection of live cells coordinates requested generation ${parseToCoordinates(input[1])}`, function () {
            this.timeout(50000);
            let [word_size, initial_cells_input, expected_results] = input;

            let requested_generations = Object.keys(expected_results).map(generation => parseInt(generation));
            let requested_cells_input = Object.keys(expected_results).map(generation => expected_results[generation]);

            let live_cells_coordinates = parseToCoordinates(initial_cells_input),
                expected_live_coordinates = requested_cells_input.map(cells_input => parseToCoordinates(cells_input));

            expect(gameOfLife(word_size, live_cells_coordinates, requested_generations))
                .to.deep.equal(expected_live_coordinates);
        });
    });
});



