const add = (firstNumber,seconNumber)=>{
  if (typeof(firstNumber)!=="number" || typeof(seconNumber)!=="number"){return false;}
  return firstNumber + seconNumber;
}

const multiply =(firstNumber,seconNumber)=>{
  return firstNumber * seconNumber;
}


module.exports={
  add,
  multiply
}
