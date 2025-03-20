0,function(){
	var origin;
	document.addEventListener("mousedown", function(evt){ origin = evt.target });
	function fixClick(func){
		return function(evt){
			if(evt.target !== origin) return;
			return func.apply(this, arguments);
		}
	};
	
	var slice = Array.prototype.slice;
	with(EventTarget.prototype){
		var attach = addEventListener;
		addEventListener = function(type, func){
			if(type != "click") return attach.apply(this, arguments);

			var args = slice.call(arguments);
			args[1] = fixClick(func);
			return attach.apply(this, args);
		}
	}
}()