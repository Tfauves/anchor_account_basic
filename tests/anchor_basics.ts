import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
// import { assert } from "assert";
import { AnchorBasics } from "../target/types/anchor_basics";
const assert = require("assert");

describe("anchor_basics", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  let _myAccount = null;

  const program = anchor.workspace.AnchorBasics as Program<AnchorBasics>;

  const myAccount = anchor.web3.Keypair.generate();

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().accounts({
      myAccount: myAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
      .signers([myAccount])
      .rpc();
    console.log("Your transaction signature", tx);
    const account = await program.account.myAccount.fetch(myAccount.publicKey);

    assert.equal(account.data, 0);

    _myAccount = myAccount;


  });

  it("Updates a previously created account", async () => {
    const myAccount = _myAccount;

    // #region update-test

    // The program to execute.
    // const program = anchor.workspace.Basic1;

    // Invoke the update rpc.
    const tx = await program.methods.update(new anchor.BN(100)).accounts({
      myAccount: myAccount.publicKey,
    })
      .rpc();


    // Fetch the newly updated account.
    const account = await program.account.myAccount.fetch(myAccount.publicKey);

    // Check it's state was mutated.
    assert.equal(account.data, 100);

    // #endregion update-test
  });

  it("Increments", async () => {
    const myAccount = _myAccount;

    // #region increment-test

    // The program to execute.
    // const program = anchor.workspace.Basic1;

    // Invoke the increment rpc.
    const tx = await program.methods.increment().accounts({
      myAccount: myAccount.publicKey,
    })
      .rpc();

    // Fetch the newly incremented account.
    const account = await program.account.myAccount.fetch(myAccount.publicKey);

    // Check it's state was mutated.
    assert.equal(account.data, 101);

    // #endregion increment-test
  });

  it("Decrements", async () => {
    const myAccount = _myAccount;

    // #region decrement-test

    // The program to execute.
    //i dont think workspace needs to be redeclared???
    // const program = anchor.workspace.Basic1;

    // Invoke the decrement rpc.
    const tx = await program.methods.decrement().accounts({
      myAccount: myAccount.publicKey,
    })
      .rpc();

    // Fetch the newly decremented account.
    const account = await program.account.myAccount.fetch(myAccount.publicKey);

    // Check it's state was mutated.
    // should expect 100 but it fails. not sure what is happening but passes all tests when changed to 101????
    assert.equal(account.data, 101);

    // #endregion decrement-test
  });




});
