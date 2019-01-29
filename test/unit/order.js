const chai = require("chai");
const expect = chai.expect;
const { checkLatLong } = require("../../helpers/Order");

describe("Helper functions for Order", () => {
    describe("checkLatLong", () => {
        it("should return true for two valid cordinates", (done) => {
            const lat = "28.530264";
            const long = "77.123761";
            expect(checkLatLong(lat, long)).equal(true);
            return done();
        });

        it("should return false for two invalid cordinates", (done) => {
            const lat = "98.530264";
            const long = "INVALID";
            expect(checkLatLong(lat, long)).equal(false);
            return done();
        });

        it("should return false for one of invalid cordinates", (done) => {
            const lat = "28.530264";
            const long = "181.123761";
            expect(checkLatLong(lat, long)).equal(false);
            return done();
        });
    });
});
