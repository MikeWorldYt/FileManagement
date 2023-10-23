async function getDirectory(){ 
  let res=await fetch("./index.json")
  let directory=await res.json()
  console.log(directory)
}

getDirectory()
