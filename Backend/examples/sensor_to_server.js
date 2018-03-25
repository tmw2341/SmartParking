$.ajax({
  url: '/sensor',
  type: 'PUT',
  data: {id: 12, status: false},
  success: function(res){
    console.log(res);
  }
})