import {expect} from 'chai';
import {describe, it} from 'mocha';
import {flatten, last, first} from 'lodash';

import numberValidation from '../01_zadanie_pierwsze';
import numberStatistic from '../02_zadanie_drugie';
import numberOfRoadsOnGrid from '../03_zadanie_trzecie';

describe("[#01] numberValidation", function () {
    let inputs = [
        [1230, true],
        [34215, true],
        [42349, false]
    ];

    inputs.forEach(function (input) {
        let [number, validity] = input;
        it(`${number} should be ${validity ? 'valid' : 'nonvalid'}`, function () {
            expect(numberValidation(number)).to.be[validity];
        });
    });
});

describe("[#02] numberStatistic", function () {
    let inputs = [
        [2, 5, {'0': 0, '1': 0, '2': 2, '3': 0, '4': 1, '5': 0, '6': 1, '7': 0, '8': 1, '9': 0}]
    ];

    inputs.forEach(function (input) {
        let [number, max_power, statistic] = input;
        it(`for ${number} and max power ${max_power}, statiscs should look like: ${statistic}`, function () {
            expect(numberStatistic(number, max_power)).to.be.eq(statistic);
        });
    });
});


describe("[#03] numberOfRoadsOnGrid", function () {
    let inputs = [
        [2, 2],
        [3, 12]
    ];

    inputs.forEach(function (input) {
        let [gridSize, possibleNumberOfRoads] = input;
        it(`for grid of size ${gridSize}x${gridSize} is ${possibleNumberOfRoads}`, function () {
            expect(numberOfRoadsOnGrid(gridSize)).to.be.eq(possibleNumberOfRoads);
        });
    });
});


