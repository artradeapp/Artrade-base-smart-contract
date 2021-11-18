const BEP20 = artifacts.require("BEP20");
const day = 24 * 60 * 60;
const { BN, time } = require('@openzeppelin/test-helpers');

contract('BEP20', (accounts) => {

  beforeEach(async function() {
    const bep = await BEP20.deployed();
    //await time.increaseTo(1616581471);
  });
  it('Test1 : The Balalance of the owner should be 0', async () => {
    const bep = await BEP20.deployed();
    const balance = await bep.balanceOf(accounts[0]);

    assert.equal(balance.valueOf(),  0, "The Ballance should be  0");
  });




/*
*  Normale Usage frome the  END of ICO to  24 M after
*/

it('Test1  test  mint  with  respect of Cliff  and Vesting : ', async () => {
  const bep = await BEP20.deployed();
  //  1 S from End of ICO
  await time.increaseTo(1644879601);
  await bep.mint(1);
  // 2 M  and 1 S from End of ICO
  await time.increaseTo(1649973601); //  15 avr
  await bep.mint(2);

  // 3 M  and 1 S from End of ICO
  await time.increaseTo(1649973601 + 2674800); // 15 mai 2022 00:00:01
  await bep.mint(2);
  await bep.mint(3);

  // 4 M  and 1 S from End of ICO
  await time.increaseTo(1649973601 + 2*2674800); //== 1655157601  14 juin 2022 00:00:01 GMT+02:00
  await bep.mint(2);
  await bep.mint(3);
  await bep.mint(4);



  // 5 M  and 1 S from End of ICO
  await time.increaseTo(1649973601 + 3*2674800);
  await bep.mint(2);
  await bep.mint(3);
  await bep.mint(4);



  // 6 M  and 1 S from End of ICO
  await time.increaseTo(1649973601 + 4*2674800);
  await bep.mint(3);
  await bep.mint(4);
  await bep.mint(6);





  // 7 M  and 1 S from End of ICO
  await time.increaseTo(1649973601 + 5*2674800);
  await bep.mint(3);
  await bep.mint(4);
  await bep.mint(6);



  // 8 M  and 1 S from End of ICO
  await time.increaseTo(1649973601 + 6*2674800);
  await bep.mint(3);
  await bep.mint(4);
  await bep.mint(6);



  // 9 M  and 1 S from End of ICO
  await time.increaseTo(1649973601 + 7*2674800);
  await bep.mint(4);
  await bep.mint(6);



  // 10 M  and 1 S from End of ICO
  await time.increaseTo(1649973601 + 8*2674800);
  await bep.mint(4);
  await bep.mint(6);



  // 11 M  and 1 S from End of ICO
  await time.increaseTo(1649973601 + 9*2674800);
  await bep.mint(4);
  await bep.mint(6);



  // 12 M  and 1 S from End of ICO
  await time.increaseTo(1649973601 + 10*2674800);
  await bep.mint(4);
  await bep.mint(6);



  // 13 M  and 1 S from End of ICO
  await time.increaseTo(1649973601 + 11*2674800);
  await bep.mint(4);
  await bep.mint(6);



  // 14 M  and 1 S from End of ICO
  await time.increaseTo(1649973601 + 12*2674800);
  await bep.mint(4);
  await bep.mint(6);



  // 15 M  and 1 S from End of ICO
  await time.increaseTo(1649973601 + 13*2674800);
  await bep.mint(4);
  await bep.mint(6);



  // 16 M  and 1 S from End of ICO
  await time.increaseTo(1649973601 + 14*2674800);
  await bep.mint(6);



  // 17 M  and 1 S from End of ICO
  await time.increaseTo(1649973601 + 15*2674800);
  await bep.mint(6);

  // 18 M  and 1 S from End of ICO
  await time.increaseTo(1649973601 + 16*2674800);
  await bep.mint(6);

  // 19 M  and 1 S from End of ICO
  await time.increaseTo(1649973601 + 17*2674800);
  await bep.mint(6);

  // 20 M  and 1 S from End of ICO
  await time.increaseTo(1649973601 + 18*2674800);
  await bep.mint(6);

  // 21 M  and 1 S from End of ICO
  await time.increaseTo(1649973601 + 19*2674800);
  await bep.mint(6);

  // 22 M  and 1 S from End of ICO
  await time.increaseTo(1649973601 + 20*2674800);
  await bep.mint(6);

  // 23 M  and 1 S from End of ICO
  await time.increaseTo(1649973601 + 21*2674800);
  await bep.mint(6);




  const balanceAss  = await bep.balanceOf(accounts[1]);
  const balanceTeam = await bep.balanceOf(accounts[2]);
  const balanceSeed = await bep.balanceOf(accounts[3]);
  const balancePriv  = await bep.balanceOf(accounts[4]);
  const balanceMark = await bep.balanceOf(accounts[5]);
  const balanceICOR1 = await bep.balanceOf(accounts[6]);
  const balanceICOR2 = await bep.balanceOf(accounts[7]);
  const balanceICOR3 = await bep.balanceOf(accounts[8]);
  const balanceReserve = await bep.balanceOf(accounts[9]);



  console.log("Balance of Reserve at the End of ICO            : " +balanceReserve.valueOf());
  console.log("Balance of Associates at the End of ICO         : " +balanceAss.valueOf());
  console.log("Balance of Teams &  advisors at the End of ICO  : "  +balanceTeam.valueOf());
  console.log("Balance of Seed supporters at the End of ICO    : " +balanceSeed.valueOf());
  console.log("Balance of Private sale at the End of ICO       : " +balancePriv.valueOf());
  console.log("Balance of Marketing, airdrop at the End of ICO : " +balanceMark.valueOf());
  console.log("Balance of ICO R1 at the End of ICO             : " +balanceICOR1.valueOf());
  console.log("Balance of ICO R2 at the End of ICO             : " +balanceICOR2.valueOf());
  console.log("Balance of ICO R3 at the End of ICO             : " +balanceICOR3.valueOf());

});




});
