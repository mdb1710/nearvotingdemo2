import { storage, Context, PersistentMap } from "near-sdk-as"


const cartoonReg = new PersistentMap<string, i32>('cr');

const votersReg = new PersistentMap<string, bool>('vr');

export function addVote(cartoon: string): void {
  if(votersReg.contains(Context.sender)) {
    return
  }
  votersReg.set(Context.sender, true);
  if(cartoonReg.contains(cartoon)){
    let currentVote = cartoonReg.getSome(cartoon);
    currentVote+=1;
    cartoonReg.set(cartoon, currentVote)

  } else {
    cartoonReg.set(cartoon, 1)
  }
}

export function getVotes(cartoon: string):i32{
  if(cartoonReg.contains(cartoon)) {
        return cartoonReg.getSome(cartoon)
    } else {
        return 0
    }
}


