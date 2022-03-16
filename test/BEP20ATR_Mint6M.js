
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
    const wallet1  = await bep.balanceOf(accounts[1]);
    const wallet2 = await bep.balanceOf(accounts[2]);
    const wallet3 = await bep.balanceOf(accounts[3]);
    const wallet4  = await bep.balanceOf(accounts[4]);
    const wallet5 = await bep.balanceOf(accounts[5]);
    const wallet6 = await bep.balanceOf(accounts[6]);

    assert.equal(wallet1.valueOf(), 213266550220000000, "The Ballance should be  0");
    assert.equal(wallet2.valueOf(), 20807010000000000, "The Ballance should be  0");
    assert.equal(wallet3.valueOf(),  9289980000000000, "The Ballance should be  0");
    assert.equal(wallet4.valueOf(),  11205234789911400, "The Ballance should be  0");
    assert.equal(wallet5.valueOf(),   15189445600000000, "The Ballance should be  0");
    assert.equal(wallet6.valueOf(),  70243377000000000, "The Ballance should be  0");
    assert.equal(balance.valueOf(),  0, "The Balance should be  0");
  });

  it('Test2 : try to mint 2 days after deployment', async () => {
    const bep = await BEP20.deployed();

    await time.increaseTo(icoNumber + 2 * day);
    await bep.mint(6);

    const balance = await bep.balanceOf(accounts[0]);
    const wallet1  = await bep.balanceOf(accounts[1]);
    const wallet2 = await bep.balanceOf(accounts[2]);
    const wallet3 = await bep.balanceOf(accounts[3]);
    const wallet4  = await bep.balanceOf(accounts[4]);
    const wallet5 = await bep.balanceOf(accounts[5]);
    const wallet6 = await bep.balanceOf(accounts[6]);

    assert.equal(wallet1.valueOf(), 213266550220000000, "The Ballance should be  0");
    assert.equal(wallet2.valueOf(), 20807010000000000, "The Ballance should be  0");
    assert.equal(wallet3.valueOf(),  9289980000000000, "The Ballance should be  0");
    assert.equal(wallet4.valueOf(),  11205234789911400, "The Ballance should be  0");
    assert.equal(wallet5.valueOf(),   15189445600000000, "The Ballance should be  0");
    assert.equal(wallet6.valueOf(),  70243377000000000, "The Ballance should be  0");
    assert.equal(balance.valueOf(),  0, "The Balance should be  0");
  });


    it('Test3 : try to mint after 5 month', async () => {
      const bep = await BEP20.deployed();
      const endOfICO = await bep.getEnndOfICO();

      await time.increaseTo(icoNumber + 5 * month);
      await bep.mint(6);
      const balance = await bep.balanceOf(accounts[0]);
      const wallet1  = await bep.balanceOf(accounts[1]);
      const wallet2 = await bep.balanceOf(accounts[2]);
      const wallet3 = await bep.balanceOf(accounts[3]);
      const wallet4  = await bep.balanceOf(accounts[4]);
      const wallet5 = await bep.balanceOf(accounts[5]);
      const wallet6 = await bep.balanceOf(accounts[6]);

      assert.equal(wallet1.valueOf(), 213266550220000000, "The Ballance should be  0");
      assert.equal(wallet2.valueOf(), 20807010000000000, "The Ballance should be  0");
      assert.equal(wallet3.valueOf(),  9289980000000000, "The Ballance should be  0");
      assert.equal(wallet4.valueOf(),  11205234789911400, "The Ballance should be  0");
      assert.equal(wallet5.valueOf(),   15189445600000000, "The Ballance should be  0");
      assert.equal(wallet6.valueOf(),  70243377000000000, "The Ballance should be  0");
      assert.equal(balance.valueOf(),  0, "The Balance should be  0");
    });

    it('Test4 : try to mint after 7 month ', async () => {
      const bep = await BEP20.deployed();
      const endOfICO = await bep.getEnndOfICO();

      await time.increaseTo(icoNumber + 7 * month + day);
      await bep.mint(6);
      const balance = await bep.balanceOf(accounts[0]);
      const wallet1  = await bep.balanceOf(accounts[1]);
      const wallet2 = await bep.balanceOf(accounts[2]);
      const wallet3 = await bep.balanceOf(accounts[3]);
      const wallet4  = await bep.balanceOf(accounts[4]);
      const wallet5 = await bep.balanceOf(accounts[5]);
      const wallet6 = await bep.balanceOf(accounts[6]);
      console.log("Balance of Private sale at the End of ICO       : " +wallet1.valueOf());


      assert.equal(wallet1.valueOf(), 213266550220000000 + 47392566710000000, "The Ballance W1 should be  0");
      assert.equal(wallet2.valueOf(),   20807010000000000 + 21962955000000000, "The Ballance W2 should be  0");
      assert.equal(wallet3.valueOf(),  9289980000000000, "The Ballance should be  0");
      assert.equal(wallet4.valueOf(),  11205234789911400, "The Ballance should be  0");
      assert.equal(wallet5.valueOf(),   15189445600000000, "The Ballance should be  0");
      assert.equal(wallet6.valueOf(),  70243377000000000, "The Ballance should be  0");
      assert.equal(balance.valueOf(),  0, "The Balance should be  0");
    });

    it('Test5 : try a second mint in the same month', async () => {
      const bep = await BEP20.deployed();
      const endOfICO = await bep.getEnndOfICO();

      await time.increaseTo(icoNumber + 7 * month + 3 * day);
      await bep.mint(6);
      const balance = await bep.balanceOf(accounts[0]);
      const wallet1  = await bep.balanceOf(accounts[1]);
      const wallet2 = await bep.balanceOf(accounts[2]);
      const wallet3 = await bep.balanceOf(accounts[3]);
      const wallet4  = await bep.balanceOf(accounts[4]);
      const wallet5 = await bep.balanceOf(accounts[5]);
      const wallet6 = await bep.balanceOf(accounts[6]);


      assert.equal(wallet1.valueOf(), 213266550220000000 + 47392566710000000, "The Ballance W1 should be  0");
      assert.equal(wallet2.valueOf(),   20807010000000000 + 21962955000000000, "The Ballance W2 should be  0");
      assert.equal(wallet3.valueOf(),  9289980000000000, "The Ballance should be  0");
      assert.equal(wallet4.valueOf(),  11205234789911400, "The Ballance should be  0");
      assert.equal(wallet5.valueOf(),   15189445600000000, "The Ballance should be  0");
      assert.equal(wallet6.valueOf(),  70243377000000000, "The Ballance should be  0");
      assert.equal(balance.valueOf(),  0, "The Balance should be  0");
    });

    it('Test6 : try to mint after 8 month ', async () => {
      const bep = await BEP20.deployed();
      const endOfICO = await bep.getEnndOfICO();

      await time.increaseTo(icoNumber + 8 * month);
      await bep.mint(6);
      const balance = await bep.balanceOf(accounts[0]);
      const wallet1  = await bep.balanceOf(accounts[1]);
      const wallet2 = await bep.balanceOf(accounts[2]);
      const wallet3 = await bep.balanceOf(accounts[3]);
      const wallet4  = await bep.balanceOf(accounts[4]);
      const wallet5 = await bep.balanceOf(accounts[5]);
      const wallet6 = await bep.balanceOf(accounts[6]);

      assert.equal(wallet1.valueOf(), 213266550220000000 + 2*47392566710000000, "The Ballance W1 should be  0");
      assert.equal(wallet2.valueOf(),   20807010000000000 + 2*21962955000000000, "The Ballance W2 should be  0");
      assert.equal(wallet3.valueOf(),  9289980000000000, "The Ballance W3 should be  0");
      assert.equal(wallet4.valueOf(),  11205234789911400, "The Ballance W4 should be  0");
      assert.equal(wallet5.valueOf(),   15189445600000000 , "The Ballance W5 should be  0");
      assert.equal(wallet6.valueOf(),  70243377000000000 , "The Ballance W6 should be  0");
      assert.equal(balance.valueOf(),  0, "The Balance should be  0");
    });

    it('Test7 : mint loop every month ( 16 mint)', async () => {
     const bep = await BEP20.deployed();
     const endOfICO = await bep.getEnndOfICO();

     for (let step = 0; step < 16; step++) {
       await time.increaseTo((icoNumber + (9 * month))  + step * month);

       await bep.mint(6);
       const balance = await bep.balanceOf(accounts[0]);
       const wallet1  = await bep.balanceOf(accounts[1]);
       const wallet2 = await bep.balanceOf(accounts[2]);
       const wallet3 = await bep.balanceOf(accounts[3]);
       const wallet4  = await bep.balanceOf(accounts[4]);
       const wallet5 = await bep.balanceOf(accounts[5]);
       const wallet6 = await bep.balanceOf(accounts[6]);

       assert.equal(wallet1.valueOf(), (213266550220000000 + (3+step)*47392566710000000), "The Ballance should be  79200000000000000 + (3+step)*17600000000000000");                                            //_associatesEndOfIcoSupply + _associatesMonthlySupply
       assert.equal(wallet2.valueOf(),   (20807010000000000 + (3+step)*21962955000000000), "The Ballance should be  8046000000000000 + (3+step)*8493000000000000");
       assert.equal(wallet3.valueOf(),  9289980000000000, "The Ballance W3 should be  0");
       assert.equal(wallet4.valueOf(),  11205234789911400, "The Ballance W4 should be  0");
       assert.equal(wallet5.valueOf(),   15189445600000000 , "The Ballance W5 should be  0");
       assert.equal(wallet6.valueOf(),  70243377000000000 , "The Ballance W6 should be  0");
       assert.equal(balance.valueOf(),  0, "The Balance should be  0");
       //const totals = balanceAss + "  "+ balanceTeam +  " "+ balanceSeed + " " +balanceReserve;
       //console.log("totals - "+ step  +" : "+totals);

     }
   });

   it('Test8 : try to mint after 24 month', async () => {
     const bep = await BEP20.deployed();
     const endOfICO = await bep.getEnndOfICO();

     await time.increaseTo((icoNumber + (9 * month))  + 16 * month);
     await bep.mint(6);
     const balance = await bep.balanceOf(accounts[0]);
     const wallet1  = await bep.balanceOf(accounts[1]);
     const wallet2 = await bep.balanceOf(accounts[2]);
     const wallet3 = await bep.balanceOf(accounts[3]);
     const wallet4  = await bep.balanceOf(accounts[4]);
     const wallet5 = await bep.balanceOf(accounts[5]);
     const wallet6 = await bep.balanceOf(accounts[6]);


                                           //_associatesEndOfIcoSupply + _associatesMonthlySupply
                                           assert.equal(wallet1.valueOf(), (213266550220000000 + 18*47392566710000000), "The Ballance should be  79200000000000000 + (3+step)*17600000000000000");                                            //_associatesEndOfIcoSupply + _associatesMonthlySupply
                                           assert.equal(wallet2.valueOf(),   (20807010000000000 + 18*21962955000000000), "The Ballance should be  8046000000000000 + (3+step)*8493000000000000");
                                           assert.equal(wallet3.valueOf(),  9289980000000000, "The Ballance W3 should be  0");
                                           assert.equal(wallet4.valueOf(),  11205234789911400, "The Ballance W4 should be  0");
                                           assert.equal(wallet5.valueOf(),   15189445600000000 , "The Ballance W5 should be  0");
                                           assert.equal(wallet6.valueOf(),  70243377000000000 , "The Ballance W6 should be  0");
                                           assert.equal(balance.valueOf(),  0, "The Balance should be  0");
        });
  });
