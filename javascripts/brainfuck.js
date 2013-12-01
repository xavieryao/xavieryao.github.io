$(document).ready(function(){
	$('#input_area').hide();
	$('#invalid').hide();
	$('#detail').hide();
});
var stack;
var cursor;	
var saved_i;
var code;

function start(){
	stack = new Array();
	cursor = 0;
	code = $('#code').val();
	run(0);
}

function resume(){
	var val = $('#input').val().charCodeAt(0);
	if(isNaN(val)){
		$('#invalid').fadeIn();
		return;
	}
	$('#invalid').fadeOut();
	$('#input_area').fadeOut();
	console.log(val);	
	stack[cursor] = val;
	run(saved_i);
}

function pause(){
	$('#input').val('');
	$('#input_area').show();
}

function run(i){
	for (; i < code.length; i++) {
		var r = parseCode(code.charAt(i));
		if(r === 'err'){
			console.log('Error occured at char #'+ i);
			break;
		}
		if(r === 'loop'){
			var loop = 0;
			for(var c = i-1; c >=0 ; c--){
				console.log(' i = '+ i + 'c = '+c);
				if(code.charAt(c) === ']'){
					loop ++;
					console.log('find ] , loop = '+ loop);
					continue;
				}
				if(code.charAt(c) === '[' && loop == 0){
					console.log('find final [,loop = '+loop);
					i = c;
					break;
				}
				if(code.charAt(c) === '['){
					loop --;
					console.log('find [, loop = '+ loop);
				}
			}
			if(loop!=0){
				console.log('Err! At code #'+i);
				break;
			}
		}
		if(r === 'jump_loop'){
			var loop = 0;
			for(var c = i+1; c <code.length ; c++){
				if(code.charAt(c) === '['){
					loop ++;
					continue;
				}
				if(code.charAt(c) === ']' && loop == 0){
					i = c;
					break;
				}
				if(code.charAt(c) === ']'){
					loop --;
				}
			}
			if(loop!=0){
				console.log('Err!');
				break;
			}
		}
		if(r === 'pause'){
			saved_i = i;
			break;
		}
	}
}
function parseCode(c){
	switch(c){
		case '>':
			cursor ++;
			console.log('> 当前: #'+ cursor+ '(#'+cursor + '= '+ stack[cursor]+')');
			break;
		case '<':
			if(--cursor < 0)
				return 'err';
			console.log('< 当前: #'+ cursor+ '(#'+cursor + '= '+ stack[cursor]+')');
			break;
		case '+':
			alloc();
			stack[cursor] ++;
			console.log('+ 当前#'+cursor+' : '+ stack[cursor]);
			break;
		case '-':
			alloc();
			if(--stack[cursor]<0)
				stack[cursor] = 255;
			console.log('- 当前#'+cursor+' : '+ stack[cursor]);
			break;
		case ']':
			if(stack[cursor]!=0)
				return 'loop';
			break;
		case '[':
			if(stack[cursor]==0)
				return 'jump_loop';
			break;
		case '.':
			alloc();
			console.log('. 当前#'+ cursor + ' : '+ stack[cursor]);
			$('#console').text($('#console').text()+String.fromCharCode(stack[cursor]));
			break;
		case ',':
			alloc();
			pause();
			return 'pause';
	}
}
function alloc(){
	if(stack[cursor]==undefined)
		stack[cursor] = 0;
}

function detail(){
	$('#whatis').fadeOut();
	$('#detail').fadeIn();
}