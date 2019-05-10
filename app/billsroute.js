const Bills = require('./models/bills.js')



module.exports = function(app, passport) {

    app.get('/profile', isLoggedIn, (req,res,next) => {
        Bills.find({ 'userId' : req.user.id }).then(bills => {
          console.log(65464764645654, req.user.id, req.user._id)
          console.log(bills)
          console.log(req.user.local.email)
          bills.totalPrice = calculateTotal(bills)
          bills.email = req.user.local.email
          bills.totalBills = bills.length;
          console.log('Final bills object ======================== ' + bills)
          res.render('profile.hbs',{bills:bills})
        })
        .catch(err => { next(err)})
      })


      
      
   
      app.post("/createBill", isLoggedIn, (req,res,next) =>{
        console.log('Creating Bill', req.body, req.user._id)
        let bill = req.body;
        bill['userId'] = req.user._id
        Bills.create(bill).then(result => {
          res.redirect('profile')
        })
      
      })


      
// Delete Bill Route
      app.get('/deleteBill/:id', isLoggedIn, (req, res, next)=>{
        Bills.findByIdAndRemove(req.params.id).then(data=>{
          console.log(data)
          res.redirect('/profile')
        }).catch(err => console.log(err) )
      
      })

// Edit Bill Routes
      app.get('/editBill/:id', isLoggedIn, (req, res, next)=>{
        Bills.find({_id:req.params.id}).then(bills=>{
          console.log("This is the bill to edit " + bills)
          res.render('editBill', bills[0])

        }).catch(err => console.log(err) )

      })

      app.post('/editBill/:id', (req,res,next) => {
        Bills.findByIdAndUpdate({_id:req.params.id}, req.body).then(bills => {
          res.redirect('/billDetail')
        })
      })



// Bill Charts Route
      app.get('/billChart', isLoggedIn, (req, res, next) => {
        console.log('bill chart')
        Bills.find({ 'userId' : req.user._id }).then(bills => {
          console.log(bills)
          res.render('billCharts', {data: JSON.stringify(bills)})
        })
      })

// Bill Detail Route
      app.get('/billDetail', (req, res, next) => {
        Bills.find({ 'userId' : req.user.id }).then(bills => {
        
          
          res.render('billDetail', {bills:bills})
        })
        
      })

// Crowds Route
app.get('/crowdCheck', isLoggedIn, (req,res,next) => {
  res.render('crowdCheck.hbs')
  })
 


app.post('/crowdCheck', isLoggedIn, (req,res,next) => {
  console.log('THIS IS THE RESULT OF THE CROWD SEARCH ////////////////// ' + req.body.name)
  Bills.find({name: req.body.name}).then(bills => {
    console.log('Crowds result search +++++++++++++++++++++++++++ ' + bills)
    bills.largestAmount = calculateLargest(bills)
    bills.totalResults = bills.length;
    console.log('Crowds object ======================== ' + bills)
    res.render('crowdCheck.hbs',{bills:bills})
  })
  .catch(err => { next(err)})
})







   



// Logged in Verification
function isLoggedIn(req,res,next){
  if (req.isAuthenticated())
    return next();
    
  res.redirect('/login');
}

function calculateTotal(obj) {
  let total = 0;
  

  for (let i = 0; i < obj.length; i++) {
    
    total += obj[i].amount
  }
  return total;
  
}

function calculateLargest(obj) {
  let highest = 0;
  

  for (let i = 0; i < obj.length;) {
    if (obj[i].amount > highest) {
    highest = obj[i].amount
  } else {
    i++
  }

  return highest;
  
}

}



}