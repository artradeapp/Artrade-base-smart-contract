const BEP20 = artifacts.require("BEP20");

module.exports = function(deployer) {
  deployer.deploy(BEP20, "0xe5c0fB5c97C22AeE4aBE25c464C5b2E303C3a712","0xeA512E2f1548a9e33d0Fb458A77A5bbD8EA9A82D","0xbd44Ede91FC2242CDBf337D9765d28EdBd03f309","0xa6A9fAF9D291e869095460bcB2d50fFE644Fd46e","0x278408a76b4771d25BFb5dF76Aa3a8bF4963e7d2", "0x92B850288963Fd77FCA8659d099894DB5d8F2Ea7","0x6E39406289045F2ba9b2D73DAE09C7C935382fE8","0xB34DDDc3326f07D09482431FE483753dd14476aA","0xa7f740EAD41cD33F2A976B3Da312D03a8df453Ac");
};
