const Bills = require('./models/bills.js')



module.exports = function(app, passport) {

    app.get('/profile', isLoggedIn, (req,res,next) => {
        Bills.find({ 'userId' : req.user.id }).then(bills => {
          console.log(bills)
          console.log(req.user.local.email)
          bills.totalPrice = calculateTotal(bills)
          bills.email = req.user.local.email
          bills.totalBills = bills.length;
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
      app.get('/billChart', (req, res, next) => {
        res.render('billCharts')
      })

// Bill Detail Route
      app.get('/billDetail', (req, res, next) => {
        Bills.find({ 'userId' : req.user.id }).then(bills => {
        
          
          res.render('billDetail', {bills:bills})
        })
        
      })










                ///details/5cc9e9a3329be1f82a23c0da
      app.get('/details/:celebID', (req,res,next)=>{
        Celebrity.findById(req.params.celebID).then(celeb=>{
          res.render("celebDetail.hbs", { celeb })
        })
      })
      
      
      app.get('/delete/:id', (req, res, next)=>{
        Celebrity.findByIdAndDelete(req.params.id).then(r=>{
          console.log(r)
          res.redirect('/celebrities')
        }).catch(err => console.log(err) )
      })
      
      
      
      
      app.post('/edit/:id', (req, res,next) => {
        Celebrity.findByIdAndUpdate(req.params.id, req.body).then(ifItWOrKs=>{
          res.redirect(`/details/${req.params.id}`)
        })
      })

}



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
  // obj.forEach(function(item) {
  //   total += item.name;
  // });
  
  // console.log(total);
  return total;
  
}

