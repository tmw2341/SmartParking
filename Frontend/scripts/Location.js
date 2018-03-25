class Location{
  constructor(fn, status) {
    this.status = status;
    this.fill = function () {
      ctx.fillStyle = this.status ? "#0f0" : "#f00";
      fn();
    }
  }
  toggle(){
    this.status = !this.status;
    this.fill();
  }
  update(status){
    this.status = status;
    this.fill();
  }
}