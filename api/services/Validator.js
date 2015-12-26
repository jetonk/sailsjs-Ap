var Validator = require('validator');
module.exports = {
    missing: [],
  paramaters: function(data){
      this.missing = [];
    for(var param in data){
       if(Validator.isNull(data[param])){
           this.missing.push(param);
       }
    }
      if(this.missing.length === 0){
          return true;
      }else{
          return this.missing;
      }
  },
    msg: function(){

    }
};