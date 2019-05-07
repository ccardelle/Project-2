const Bills = require('./models/bills.js')



module.exports = function(app, passport) {

    app.get('/profile', isLoggedIn, (req,res,next) => {
        Bills.find({ 'userId' : req.user.id }).then(bills => {
          console.log(bills)
          console.log(req.user.local.email)
          bills.email = req.user.local.email
          res.render('profile.hbs',{bills:bills})
        })
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

// Edit Bill Route
      app.get('/edit/:id', (req, res,next) => {
        Bills.findById(req.params.id).then(bills=>{
          res.render("edit.hbs", { bills })
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