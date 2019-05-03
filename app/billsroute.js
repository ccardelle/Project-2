const Bills = require('./models/bills.js')



module.exports = function(app, passport) {

    // app.get('/bills', (req,res,next) => {
    //     Bills.find().then(bills => {
    //       res.render('bills.hbs', { bills })
    //     })
    //   })
      
      app.get('/bills', (req,res,next) => {
        res.render('bills.hbs')
        });
      




      
      app.post("/createBill", (req,res,next) =>{
        console.log('Creating Bill', req.body)
        Bills.create(req.body).then(result => {
          res.redirect('profile')
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