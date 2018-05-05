let Pipeline = {
  data: [],
  ops: [],
  
  get: function () {
    let res = []
    for (let i = 0; i < this.data.length; i++) {
      let val = this.data[i]
      let passesFilters = true
      for (let j = 0; passesFilters && j < this.ops.length; j++) {
        let op = this.ops[j]
        switch (op.type) {
          case 'map':
            val = op.func(val)
            break;
            
          case 'filter':
            passesFilters = op.func(val)
            break;
          default:
            throw new Exception('Illegal op type')
        }
      }
      
      if (passesFilters) {
        res.push(val)
      }
    }
    return res
  },
  
  make_new: function (data) {
    return Object.create(Pipeline, { data: { value: data }})
  },
  
  add_op: function (type, func) {
    this.ops.push({
      type: type,
      func: func
    })
  },
  
  map: function (func) {
    this.add_op('map', func)
    return this
  },
  
  filter: function (func) {
    this.add_op('filter', func)
    return this
  }
}
