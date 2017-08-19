
exports.execute = (doc,formClasses,type) => {
  let forms = formClasses.map(formClass => new formClass(doc));
  for (let form of forms) {
    let result = form.getParams(type);
    if(result){
      return result;
    }
  }
};


exports.createFilter = filters => {
  return params =>{
    for (let filter of filters) {
      if(filter(params) === false){
        return false;
      }
    }
    return true;
  }
}
