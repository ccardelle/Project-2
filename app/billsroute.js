const Bills = require('./models/bills.js')



module.exports = function(app, passport) {

    app.get('/profile', isLoggedIn, (req,res,next) => {
        Bills.find({ 'userId' : req.user.id }).then(bills => {
          console.log(bills)
          console.log(req.user.local.email)
          email = req.user.local.email
          res.render('profile.hbs',{bills:bills})
        })
      })


      
      
      // app.get('/bills', (req,res,next) => {
      //   res.render('bills.hbs')
      //   });
   
      app.post("/createBill", isLoggedIn, (req,res,next) =>{
        console.log('Creating Bill', req.body, req.user._id)
        let bill = req.body;
        bill['userId'] = req.user._id
        Bills.create(bill).then(result => {
          res.redirect('profile')
        })
      
      })


      
      
      app.get('/deleteBill/:id', isLoggedIn, (req, res, next)=>{
        Bills.findByIdAndRemove(req.params.id).then(data=>{
          console.log(data)
          res.redirect('/profile')
        }).catch(err => console.log(err) )
      
      })

      
      
      app.get('/billChart', (req, res, next) => {
        res.render('billCharts')
      })


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
      
      
      app.get('/edit/:id', (req, res,next) => {
        Celebrity.findById(req.params.id).then(celeb=>{
          res.render("edit.hbs", { celeb })
        })
      })
      //http://localhost:3000/edit/5cc9ee3d420635faac3fd7df
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