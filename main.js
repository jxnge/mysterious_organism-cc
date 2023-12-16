const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

const pAequorFactory = (num, dnaArray) => {
  return {
    _specimenNum : num,
    _dnaArray : dnaArray,
    mutate(){
      let mutateArray = this._dnaArray;
      for (let dna of mutateArray){
        if (dna === 'A'){
          let loopArray = ['T', 'C', 'G'];
          let loopDna = loopArray[Math.floor(Math.random() * 3)] 
          mutateArray[mutateArray.indexOf(dna)] = loopDna;
        } else if (dna === 'T'){
          let loopArray = ['A', 'C', 'G'];
          let loopDna = loopArray[Math.floor(Math.random() * 3)] 
          mutateArray[mutateArray.indexOf(dna)] = loopDna;
        } else if (dna === 'C'){
          let loopArray = ['A', 'T', 'G'];
          let loopDna = loopArray[Math.floor(Math.random() * 3)] 
          mutateArray[mutateArray.indexOf(dna)] = loopDna;
        } else{
          let loopArray = ['A', 'T', 'C'];
          let loopDna = loopArray[Math.floor(Math.random() * 3)] 
          mutateArray[mutateArray.indexOf(dna)] = loopDna;
        }
      }
      return mutateArray;
    },
    compareDna(pAequor){
      let firstArray = this._dnaArray;
      let secondArray = pAequor;
      let commonDna = 0;
      for (let i = 0; i < firstArray.length; i++){
        if (firstArray[i] === secondArray[i]){
          commonDna++;
        }
      }
      commonDna = Math.ceil((commonDna / 15) * 100);
      console.log(`specimen #1 and specimen #2 have ${commonDna}% DNA in common`);
    },
    willLikelySurvive(){
      let surviveArray = this._dnaArray;
      let likelySurviving = 0;
      for (let i = 0; i < surviveArray.length; i++){
        if (surviveArray[i] === 'C' || surviveArray[i] === 'G'){
          likelySurviving++;
        }
      }
      likelySurviving = Math.ceil((likelySurviving / 15) * 100);
      if (likelySurviving >= 60){
        return true;
      } else{
        return false;
      }
    }
  }
}


const canSurviveInstances = () => {
  let survived = [];
  let x = 1;
  while (x < 31){
    const sampleAequor = pAequorFactory(x, mockUpStrand())
    let survival = sampleAequor.willLikelySurvive(mockUpStrand())
    if (survival === true){
      x++;
      let num = sampleAequor._specimenNum;
      let dna = sampleAequor._dnaArray;
      const obj = {num, dna};
      survived.push(obj);
    }
  }
  console.log(survived)
}

const sampleAequor = pAequorFactory(1, mockUpStrand());
console.log(sampleAequor.mutate());

sampleAequor.compareDna(mockUpStrand());

console.log(sampleAequor.willLikelySurvive());

canSurviveInstances();


