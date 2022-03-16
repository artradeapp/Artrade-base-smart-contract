const BEP20 = artifacts.require("BEP20");
const day = 24 * 60 * 60;
const month = 31 * day ;
const { BN, time } = require('@openzeppelin/test-helpers');
let icoNumber = 0;
contract('BEP20', (accounts) => {

  beforeEach(async function() {
    const bep = await BEP20.deployed();
    const endOfICO = await bep.getEndOfICO();
    icoNumber = endOfICO.toNumber();
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

  // 2 M  and 1 S from End of ICO
  await time.increaseTo(icoNumber + 2 * month); //  15 avr
  await bep.mint(2);

  // 3 M  and 1 S from End of ICO
  await time.increaseTo(icoNumber + 3 * month ); // 15 mai 2022 00:00:01
  await bep.mint(2);
  await bep.mint(3);

  // 4 M  and 1 S from End of ICO
  await time.increaseTo(icoNumber + 4 * month); //== 1655157601  14 juin 2022 00:00:01 GMT+02:00
  await bep.mint(2);
  await bep.mint(3);



  // 5 M  and 1 S from End of ICO
  await time.increaseTo(icoNumber + 5 * month);
  await bep.mint(2);
  await bep.mint(3);
  await bep.mint(4);



  // 6 M  and 1 S from End of ICO
  await time.increaseTo(icoNumber + 6 * month);
  await bep.mint(3);
  await bep.mint(4);





  // 7 M  and 1 S from End of ICO
  await time.increaseTo(icoNumber + 7 * month);
  await bep.mint(3);
  await bep.mint(4);
  await bep.mint(6);



  // 8 M  and 1 S from End of ICO
  await time.increaseTo(icoNumber + 8 * month);
  await bep.mint(3);
  await bep.mint(4);
  await bep.mint(6);



  // 9 M  and 1 S from End of ICO
  await time.increaseTo(icoNumber + 9 * month);
  await bep.mint(4);
  await bep.mint(6);



  // 10 M  and 1 S from End of ICO
  await time.increaseTo(icoNumber + 10 * month);
  await bep.mint(4);
  await bep.mint(6);



  // 11 M  and 1 S from End of ICO
  await time.increaseTo(icoNumber + 11 * month);
  await bep.mint(4);
  await bep.mint(6);



  // 12 M  and 1 S from End of ICO
  await time.increaseTo(icoNumber + 12 * month);
  await bep.mint(4);
  await bep.mint(6);



  // 13 M  and 1 S from End of ICO
  await time.increaseTo(icoNumber + 13 * month);
  await bep.mint(4);
  await bep.mint(6);



  // 14 M  and 1 S from End of ICO
  await time.increaseTo(icoNumber + 14 * month);
  await bep.mint(4);
  await bep.mint(6);



  // 15 M  and 1 S from End of ICO
  await time.increaseTo(icoNumber + 15 * month);
  await bep.mint(4);
  await bep.mint(6);



  // 16 M  and 1 S from End of ICO
  await time.increaseTo(icoNumber + 16 * month);
  await bep.mint(4);
  await bep.mint(6);



  // 17 M  and 1 S from End of ICO
  await time.increaseTo(icoNumber + 17 * month);
  await bep.mint(6);

  // 18 M  and 1 S from End of ICO
  await time.increaseTo(icoNumber + 18 * month);
  await bep.mint(6);

  // 19 M  and 1 S from End of ICO
  await time.increaseTo(icoNumber + 19 * month);
  await bep.mint(6);

  // 20 M  and 1 S from End of ICO
  await time.increaseTo(icoNumber + 20 * month);
  await bep.mint(6);

  // 21 M  and 1 S from End of ICO
  await time.increaseTo(icoNumber + 21 * month);
  await bep.mint(6);

  // 22 M  and 1 S from End of ICO
  await time.increaseTo(icoNumber + 22 * month);
  await bep.mint(6);

  // 23 M  and 1 S from End of ICO
  await time.increaseTo(icoNumber + 23 * month);
  await bep.mint(6);

  // 23 M  and 1 S from End of ICO
  await time.increaseTo(icoNumber + 24 * month);
  await bep.mint(6);


  const balanceAss  = await bep.balanceOf(accounts[1]);
  const balanceTeam = await bep.balanceOf(accounts[2]);
  const balanceSeed = await bep.balanceOf(accounts[3]);
  const balancePriv  = await bep.balanceOf(accounts[4]);
  const balanceMark = await bep.balanceOf(accounts[5]);
  const balanceICOR1 = await bep.balanceOf(accounts[6]);




  console.log("Balance of Associates at the End of ICO         : " +balanceAss.valueOf());
  console.log("Balance of Teams &  advisors at the End of ICO  : "  +balanceTeam.valueOf());
  console.log("Balance of Seed supporters at the End of ICO    : " +balanceSeed.valueOf());
  console.log("Balance of Private sale at the End of ICO       : " +balancePriv.valueOf());
  console.log("Balance of Marketing, airdrop at the End of ICO : " +balanceMark.valueOf());
  console.log("Balance of ICO R1 at the End of ICO             : " +balanceICOR1.valueOf());

});
});
