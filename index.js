let configuration = {
  frontContent: "Happy Birthday, Odin One-Eye!",
  insideContent: "From Asgard to Nifelheim, you're the best all-father ever.\n\nLove,",
  closing: {
      "Thor": "Admiration, respect, and love",
      "Loki": "Your son"
  },
  signatories: [
      "Thor",
      "Loki"
  ]
}


//  Lost Context Bug:
let printCardA = function() {
  console.log(this.frontContent)
  console.log(this.insideContent)

  this.signatories.forEach(function(signatory){
      let message = `${this.closing[signatory]}, ${signatory}`
      console.log(message)
  })
}
    // printCardA.call(configuration)



// Debugging: Discovering the Nature of the Lost Context Bug
let printCardB = function() {
  console.log(this.frontContent)
  console.log(this.insideContent)

  console.log("Debug Before forEach: " + this)
  this.signatories.forEach(function(signatory){
      console.log("Debug Inside: " + this)
      // let message = `${this.closing[signatory]}, ${signatory}`
      // console.log(message)
  })
}
    // printCardB.call(configuration)

    

// Solution 1A: Use a thisArg to avoid the lost context bug
let printCard1A = function() {
  console.log(this.frontContent)
  console.log(this.insideContent)

  this.signatories.forEach(function(signatory){
      let message = `${this.closing[signatory]}, ${signatory}`
      console.log(message)
  }, this)
}
printCard1A.call(configuration)



// Solution 1B: invoke bind on the function expression in the forEach:
let printCard1B = function() {
  console.log(this.frontContent)
  console.log(this.insideContent)
  let contextBoundForEachExpr = function(signatory){
      let message = `${this.closing[signatory]}, ${signatory}`
      console.log(message)
  }.bind(this)

  this.signatories.forEach(contextBoundForEachExpr)
}
printCard1B.call(configuration)


// Solution 2: Use a Closure to Regain Access to the Lost Context
let printCard2 = function() {
  console.log(this.frontContent)
  console.log(this.insideContent)

  let outerContext = this

  this.signatories.forEach(function(signatory){
      let message = `${outerContext.closing[signatory]}, ${signatory}`
      console.log(message)
  })
}
printCard2.call(configuration)


// Solution 3: Use an Arrow Function Expression to Create a Function Without Its Own Context
let printCard3 = function() {
  console.log(this.frontContent)
  console.log(this.insideContent)
  // Wow! Elegant! And notice the arrow function's `this` is the same
  // this that printCard has by virtue of configuration being passed
  // in as a thisArg
  this.signatories.forEach(s => console.log(`${this.closing[s]}, ${s}`)
  )
}
printCard3.call(configuration)


