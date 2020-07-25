function WaitGroup(){
    var num = 0,waitFn;
    
    function doCallFn(){
        if(num <= 0 && waitFn){
            waitFn();
            waitFn = null;
        }
    }
    
    this.Add = function(n){
        num += n;
    };
    
    this.Done = function(){
        this.Add(-1);
        doCallFn();
    };
    
    this.Wait = function(fn){
        waitFn = fn;
        doCallFn();
    };
}

module.exports = {
   WaitGroup,
}