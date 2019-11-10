$(function(){
	$('#ck').click(function(){
		$('input[name="item"]').prop('checked',this.checked);
		calcountandprice();
	});
	
	$('input[name="item"]').click(function(){
		if(!this.checked) {
			$('#ck').prop('checked',false);
		} else {
			if($('input[name="item"]').length === $('input[name="item"]:checked').length) {
				$('#ck').prop('checked',true);
			} else {
				$('#ck').prop('checked',false);
			}
		}
		calcountandprice();
	});
	var deleteObject ;// 删除的对象
	// 给所有的删除按钮绑定一个点击事件
	$('li.cz').click(function(){
// 		var flag = window.confirm("你确定要删除吗?");
// 		console.log(flag);
		// 打开一个beautiful dialog
		// 控制对话框显示的位置
		showMask();
		showDialog();
		$('div.dialog').show();
		deleteObject = $(this).parent();
	});
	// 给关闭和 XX绑定点击事件
	$('#closePic,#btnCancel').click(function(){
		$('div.dialog').hide();
		$('div.mask').hide();
	});
	// 给确定按钮绑定点击事件
	$('#btnSure').click(function(){
		$('div.dialog').hide();
		$('div.mask').hide();
		deleteObject.remove();
		calcountandprice();
	});
	// 给全部删除绑定一个点击事件
	$('#btnDelMul').click(function() {
		if($('input[name="item"]:checked').length === 0) {
			alert('兄弟，你至少要选择一行........');
			return ;
		} else {
			var flag = window.confirm('兄弟，你确定删除吗?');
			if(flag) {
				$('input[name="item"]:checked').each(function(index,item) {
					$(item).parent().parent().remove();
				});
			}
		}
		calcountandprice();
	});
	// 给所有的image绑定一个鼠标移入和鼠标移出的事件
	$('img').mouseover(function(e){
		$('img#imgTip').attr('src',$(this).attr('src')).css({
			top: e.pageY + 10+'px',
			left: e.pageX + 5 +'px',
			display: 'block'
		});
	}).mouseout(function(){
		$('img#imgTip').hide();
	});
	calcountandprice();
});
// 打开遮罩层
function showMask() {
	var $body = $('body');
	$('div.mask').css({
		width: $body.width()+'px',
		height: $body.height() + 'px',
		display: 'block'
	});
}
// 计算dialog的位置
function showDialog() {
	var $window = $(window);
	var $dialog = $('div.dialog') ;
	$dialog.css({
		left: ($window.width() - $dialog.width())/2 +'px',
		top: ($window.height() - $dialog.height())/2 +'px'
	});
}
// 统计商品的数量和价格
function calcountandprice() {
	var $input = $('input[name="item"]') ;
	var $count = $('input.txt') ;
	var $li = $('li.rs');
	var count = 0 ;
	var total = 0.0 ;
	for(var i = 0 ;i<$input.length ;i++) {
		if($input[i].checked) {
			count += parseInt($count[i].value);
			total += parseFloat($li[i+1].innerHTML.substring(1))*parseInt($count[i].value) ;
			
		}
	}
	// console.log(count +":"+total.toFixed(1));
	$('#spanItemCount').html(count);
	$('#sp').html(total.toFixed(1));
}