class Location{
  constructor(x, y, status=true) {
    this.status = status;
    this.x = x;
    this.y = y;
  }
  fill(){
    ctx.fillStyle = this.status ? "#0f0" : "#f00";
    ctx.fillRect(this.x,this.y,15,15);
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