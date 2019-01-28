const chai = require("chai");
const expect = chai.expect;
const { getDistance, checkLatLong } = require("../../helpers/Order");

describe("Helper functions for Order", () => {
  describe("getDistance", () => {
    it("should return distance for two valid cordinates", done => {
      return getDistance(
        ["28.530264", "77.123761"],
        ["28.530264", "77.111761"]
      ).then(function(blah) {
        expect(distance.distanceValue).equal(2088);
      });
      // const distance = await getDistance(["28.530264", "77.123761"], ["28.530264", "77.111761"]);
      // expect(distance.distanceValue).equal(2088);
      // return done();
      // const distance = await getDistance(["28.530264", "77.123761"], ["28.530264", "77.111761"]);
      // console.log("distance", distance);
      // return new Promise(resolve => {
      //     expect(distance.distanceValue).equal(2088);
      //     return done();
      // });
    });

    // it('should append "risk" key with null value if no risks are indicated', (done) => {
    // 	const noRisksDpia = omit(DPIAS[1], 'data.risks');
    // 	const noRiskFrontendObject = forFrontend(noRisksDpia);

    // 	expect(noRiskFrontendObject.risk).toBeNull();

    // 	return done();
    // });
  });
});
